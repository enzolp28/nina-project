"use client";
import { useState } from "react";

export default function TestUpload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleUpload(e) {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setResult(null);

        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();

        setResult(data);
        setLoading(false);
    }

    return (
        <main style={{ padding: 240 }}>
            <h1>Test upload</h1>

            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button disabled={loading} style={{ marginLeft: 12 }}>
                    {loading ? "Upload..." : "Uploader"}
                </button>
            </form>

            {result?.url && (
                <>
                    <p>URL: {result.url}</p>
                    <img src={result.url} alt="preview" style={{ maxWidth: 400, marginTop: 12 }} />
                </>
            )}

            {result?.error && <p style={{ color: "red" }}>{result.error}</p>}
        </main>
    );
}
