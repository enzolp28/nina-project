import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function requireAdmin() {
    const cookieStore = cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
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
        return { ok: false, status: 403, error: "Accès interdit" };
    }

    return { ok: true, user: data.user };
}
