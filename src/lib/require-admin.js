import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function requireAdmin() {
    const cookieStore = await cookies(); // ✅ IMPORTANT

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll() {
                    // ✅ Route Handler : tu pourrais écrire les cookies ici si besoin,
                    // mais pour requireAdmin, on peut laisser vide.
                },
            },
        }
    );

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        return { ok: false, status: 401, error: "Non connecté" };
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && data.user.email !== adminEmail) {
        return { ok: false, status: 403, error: "Accès refusé" };
    }

    return { ok: true, user: data.user };
}
