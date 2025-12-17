import { NextResponse } from "next/server";

export function GET() {
    const v = process.env.DATABASE_URL || "";
    if (!v) {
        return NextResponse.json({ ok: false, error: "DATABASE_URL manquante" }, { status: 500 });
    }

    try {
        const u = new URL(v);
        return NextResponse.json({
            ok: true,
            protocol: u.protocol,
            username: u.username,
            host: u.host,
            port: u.port,
            pathname: u.pathname,
            search: u.search,
            hasPassword: Boolean(u.password),
            passwordLength: u.password.length,
        });
    } catch (e) {
        return NextResponse.json(
            { ok: false, error: "DATABASE_URL invalide", valueStart: v.slice(0, 60) },
            { status: 500 }
        );
    }
}
