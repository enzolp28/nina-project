"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();

        router.push("/login");
        router.refresh(); // important pour forcer le refresh SSR
    }

    return (
        <button
            onClick={handleLogout}
            className="border rounded px-4 py-2"
        >
            Se déconnecter
        </button>
    );
}
