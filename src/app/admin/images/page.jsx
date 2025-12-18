"use client";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";

export default function AdminImages() {
    const [src, setSrc] = useState("");
    const [alt, setAlt] = useState("");
    const [tagsText, setTagsText] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editSrc, setEditSrc] = useState("");
    const [editAlt, setEditAlt] = useState("");
    const [editTagsText, setEditTagsText] = useState("");


    async function refresh() {
        const res = await fetch("/api/images");
        const data = await res.json();
        setImages(data);
    }

    useEffect(() => {
        refresh();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        const tags = tagsText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const res = await fetch("/api/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "image", src, alt, tags }),
        });

        const data = await res.json();

        if (!res.ok) {
            setMsg(data?.error || "Erreur");
            setLoading(false);
            return;
        }

        setSrc("");
        setAlt("");
        setTagsText("");
        setMsg("Ajouté ✅");
        await refresh();
        setLoading(false);
    }

    function startEdit(img) {
        setEditingId(img.id);
        setEditSrc(img.src);
        setEditAlt(img.alt || "");
        setEditTagsText((img.tags || []).join(", "));
    }

    function cancelEdit() {
        setEditingId(null);
        setEditSrc("");
        setEditAlt("");
        setEditTagsText("");
    }


    return (
        <main className="max-w-3xl mx-auto p-6 mt-20">
            <h1 className="text-2xl font-bold mb-4">Admin — Images</h1>
            <LogoutButton />

            <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-xl">
                <div>
                    <label className="block text-sm font-semibold">src (ex: /images/xxx.jpg)</label>
                    <input
                        className="w-full border rounded p-2"
                        value={src}
                        onChange={(e) => setSrc(e.target.value)}
                        placeholder="/images/agence-noel.jpg"
                    />
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
                    <label className="block text-sm font-semibold">tags (séparés par des virgules)</label>
                    <input
                        className="w-full border rounded p-2"
                        value={tagsText}
                        onChange={(e) => setTagsText(e.target.value)}
                        placeholder="entreprise, noel"
                    />
                </div>

                <button className="border rounded px-4 py-2" disabled={loading}>
                    {loading ? "Ajout..." : "Ajouter"}
                </button>

                {msg && <p className="text-sm">{msg}</p>}
            </form>

            <h2 className="text-xl font-semibold mt-8 mb-3">Images en base</h2>

            <ul className="space-y-2">
                {images.map((img) => (

                    <li key={img.id} className="border rounded p-3 flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm"><b>ID:</b> {img.id}</div>
                            <div className="text-sm"><b>src:</b> {img.src}</div>
                            <div className="text-sm"><b>alt:</b> {img.alt}</div>
                            <div className="text-sm"><b>tags:</b> {img.tags.join(", ")}</div>
                        </div>

                        {editingId === img.id && (
                            <div className="mt-3 space-y-2">
                                <input
                                    className="w-full border rounded p-2"
                                    value={editSrc}
                                    onChange={(e) => setEditSrc(e.target.value)}
                                    placeholder="src"
                                />

                                <input
                                    className="w-full border rounded p-2"
                                    value={editAlt}
                                    onChange={(e) => setEditAlt(e.target.value)}
                                    placeholder="alt"
                                />

                                <input
                                    className="w-full border rounded p-2"
                                    value={editTagsText}
                                    onChange={(e) => setEditTagsText(e.target.value)}
                                    placeholder="tags : entreprise, halloween"
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => {
                                            const tags = editTagsText
                                                .split(",")
                                                .map((t) => t.trim())
                                                .filter(Boolean);

                                            await fetch(`/api/images/${img.id}`, {
                                                method: "PUT",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    type: "image",
                                                    src: editSrc,
                                                    alt: editAlt,
                                                    tags,
                                                }),
                                            });

                                            cancelEdit();
                                            await refresh();
                                        }}
                                    >
                                        Enregistrer
                                    </button>

                                    <button onClick={cancelEdit}>Annuler</button>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                className="border rounded px-3 py-1"
                                onClick={() => startEdit(img)}
                            >
                                Modifier
                            </button>

                            <button
                                className="border rounded px-3 py-1"
                                onClick={async () => {
                                    const ok = confirm("Supprimer cette image ?");
                                    if (!ok) return;

                                    const res = await fetch(`/api/images/${img.id}`, { method: "DELETE" });
                                    const data = await res.json().catch(() => ({}));

                                    if (!res.ok) {
                                        alert(data?.error || "Erreur suppression");
                                        return;
                                    }

                                    await refresh();
                                }}
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
