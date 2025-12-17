import { NextResponse } from "next/server";

export function GET() {
    const v = process.env.DATABASE_URL || "";
    if (!v) return NextResponse.json({ ok: false, error: "DATABASE_URL manquante" }, { status: 500 });

    try {
        const u = new URL(v);
        return NextResponse.json({
            ok: true,
            host: u.host,
            username: u.username,
            pathname: u.pathname,
            search: u.search,
            hasPassword: Boolean(u.password),
            passwordLength: u.password.length,
        });
    } catch {
        return NextResponse.json({ ok: false, error: "DATABASE_URL invalide" }, { status: 500 });
    }
}
