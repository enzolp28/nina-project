import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({ children }) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    const user = data?.user;
    if (!user) redirect("/login");

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && user.email !== adminEmail) redirect("/");

    return <>{children}</>;
}
