import { redirect } from "next/navigation";
import { createServerComponentClient } from "@/lib/supabase-server";

export default async function AdminLayout({ children }) {
    const supabase = await createServerComponentClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) redirect("/login");

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && data.user.email !== adminEmail) redirect("/");

    return <>{children}</>;
}
