import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// ✅ À utiliser dans les Server Components (layout, pages server)
// => lecture OK, écriture cookies interdite
export async function createServerComponentClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll() {
                    // ne rien faire (interdit de modifier les cookies ici)
                },
            },
        }
    );
}

// ✅ À utiliser dans les Route Handlers (app/api/*)
// => ici, on a le droit d'écrire les cookies
export async function createRouteHandlerClient() {
    const cookieStore = await cookies();

    return createServerClient(
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
}
