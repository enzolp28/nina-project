"use client";

import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function AdminImages() {
    // ✅ Upload (remplace le src manuel)
    const [files, setFiles] = useState([]);
    const [alt, setAlt] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);


    const SERVICE_TAGS = [
        { value: "anniversaire", label: "🎉 Anniversaires" },
        { value: "fetes", label: "🎄 Fêtes de fin d’année" },
        { value: "receptions", label: "🥂 Réceptions" },
        { value: "baby-showers", label: "👶 Baby showers" },
        { value: "entreprise", label: "💼 Entreprise" },
        { value: "domicile", label: "🏠 Domicile" },
    ];


    // ✅ Liste images
    const [images, setImages] = useState([]);

    // ✅ UX
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    // ✅ Edition
    const [editingId, setEditingId] = useState(null);
    // const [editSrc, setEditSrc] = useState("");
    const [editAlt, setEditAlt] = useState("");
    const [editTagsText, setEditTagsText] = useState("");

    async function refresh() {
        const res = await fetch("/api/images");
        const data = await res.json();
        setImages(Array.isArray(data) ? data : []);
    }

    useEffect(() => {
        refresh();
    }, []);

    // ✅ Envoi FormData à /api/upload
    async function handleSubmit(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            if (!files.length) {
                setMsg("Choisis au moins 1 image");
                setLoading(false);
                return;
            }

            const fd = new FormData();
            for (const f of files) fd.append("files", f);

            fd.append("alt", alt);
            fd.append("tags", selectedTags.join(",")); // "entreprise, noel"

            const res = await fetch("/api/upload", {
                method: "POST",
                body: fd,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setMsg(data?.error || "Erreur upload");
                setLoading(false);
                return;
            }

            setFiles([]);
            setAlt("");
            setSelectedTags([]);
            setMsg(`Upload OK ✅ (${data?.created?.length || 0})`);
            await refresh();
        } catch (err) {
            setMsg(err?.message || "Erreur");
        } finally {
            setLoading(false);
        }
    }

    function startEdit(img) {
        setEditingId(img.id);
        // setEditSrc(img.src);
        setEditAlt(img.alt || "");
        setEditTagsText((img.tags || []).join(", "));
    }

    function cancelEdit() {
        setEditingId(null);
        // setEditSrc("");
        setEditAlt("");
        setEditTagsText("");
    }

    async function saveEdit(imgId) {
        const tags = editTagsText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const res = await fetch(`/api/images/${imgId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "image",
                // src: editSrc,
                alt: editAlt,
                tags,
            }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            alert(data?.error || "Erreur modification");
            return;
        }

        cancelEdit();
        await refresh();
    }

    async function deleteImage(imgId) {
        const ok = confirm("Supprimer cette image ?");
        if (!ok) return;

        const res = await fetch(`/api/images/${imgId}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            alert(data?.error || "Erreur suppression");
            return;
        }

        await refresh();
    }

    return (
        <main className="max-w-5xl mx-auto p-3 mt-20">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Admin — Images</h1>
                <LogoutButton />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-xl">
                <div>
                    <label className="block text-sm font-semibold">Fichiers (upload)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    />
                    {files.length > 0 && (
                        <p className="text-xs mt-1">{files.length} fichier(s) sélectionné(s)</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold">alt</label>
                    <input
                        className="w-full border rounded p-2"
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                        placeholder="Agence décorée Noël"
                    />
                </div>

                <div>
                    <p className="block text-sm font-semibold mb-2">Tags (services)</p>
                    <div className="grid grid-cols-2 gap-2 justify-items-start">

                        {SERVICE_TAGS.map((t) => (
                            <label key={t.value} className="inline-flex w-fit items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(t.value)}
                                    onChange={(e) => {
                                        setSelectedTags((prev) =>
                                            e.target.checked
                                                ? [...prev, t.value]
                                                : prev.filter((x) => x !== t.value)
                                        );
                                    }}
                                />
                                {t.label}
                            </label>
                        ))}
                    </div>
                </div>


                <button className="border rounded px-4 py-2 hover:bg-amber-50 cursor-pointer" disabled={loading}>
                    {loading ? "Upload..." : "Uploader"}
                </button>

                {msg && <p className="text-sm">{msg}</p>}
            </form>

            <h2 className="text-xl font-semibold mt-8 mb-3">Images en base</h2>

            <ul className="space-y-2">
                {images.map((img) => (
                    <li
                        key={img.id}
                        className="border rounded p-3 flex items-start justify-between gap-4"
                    >
                        <div>
                            <div className="text-sm">
                                <b>ID:</b> {img.id}
                            </div>

                            <div className="text-sm">
                                <b>alt:</b> {img.alt}
                            </div>
                            <div className="text-sm">
                                <b>tags:</b> {(img.tags || []).join(", ")}
                            </div>
                            <div className="w-24 h-24 relative shrink-0">
                                <Image
                                    src={img.src}
                                    alt={img.alt || ""}
                                    fill
                                    className="object-cover rounded"
                                    sizes="96px"
                                />
                            </div>


                            {editingId === img.id && (
                                <div className="mt-3 space-y-2">
                                    {/* <input
                                        className="w-full border rounded p-2"
                                        value={editSrc}
                                        onChange={(e) => setEditSrc(e.target.value)}
                                        placeholder="src"
                                    /> */}
                                    <label htmlFor="">Alt: </label>
                                    <input
                                        className="w-full border rounded p-2"
                                        value={editAlt}
                                        onChange={(e) => setEditAlt(e.target.value)}
                                        placeholder="alt"
                                    />

                                    <label htmlFor="">tag: </label>
                                    <input
                                        className="w-full border rounded p-2"
                                        value={editTagsText}
                                        onChange={(e) => setEditTagsText(e.target.value)}
                                        placeholder="tags : entreprise, halloween"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="border rounded px-3 py-1"
                                            onClick={() => saveEdit(img.id)}
                                        >
                                            Enregistrer
                                        </button>

                                        <button
                                            type="button"
                                            className="border rounded px-3 py-1"
                                            onClick={cancelEdit}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="border rounded px-3 py-1"
                                onClick={() => startEdit(img)}
                            >
                                Modifier
                            </button>

                            <button
                                type="button"
                                className="border rounded px-3 py-1"
                                onClick={() => deleteImage(img.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
