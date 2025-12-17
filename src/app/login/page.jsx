"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setMsg("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return setMsg(error.message);

        router.push("/admin/images");
        router.refresh();
    }

    return (
        <main className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>

            <form onSubmit={handleLogin} className="space-y-3 border p-4 rounded-xl">
                <input
                    className="w-full border rounded p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full border rounded p-2"
                    placeholder="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="border rounded px-4 py-2">Se connecter</button>
                {msg && <p className="text-sm">{msg}</p>}
            </form>
        </main>
    );
}
