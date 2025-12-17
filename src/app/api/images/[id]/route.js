import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "@/lib/require-admin";


const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function DELETE(_req, { params }) {
    const auth = await requireAdmin();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const id = Number(params.id);
        if (!id) {
            return NextResponse.json({ error: "ID invalide" }, { status: 400 });
        }

        // Supprime l'image
        await prisma.image.delete({ where: { id } });

        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const auth = await requireAdmin();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const id = Number(params.id);
        if (!id) {
            return NextResponse.json({ error: "ID invalide" }, { status: 400 });
        }

        const body = await req.json();
        const { type, src, alt, tags } = body;

        if (!src) {
            return NextResponse.json({ error: "src est obligatoire" }, { status: 400 });
        }

        const cleanTags = Array.isArray(tags)
            ? tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean)
            : [];

        const updated = await prisma.image.update({
            where: { id },
            data: {
                type: type ?? "image",
                src,
                alt: alt ?? "",
                tags: {
                    // on repart propre : on remplace la liste de tags
                    set: [],
                    connectOrCreate: cleanTags.map((name) => ({
                        where: { name },
                        create: { name },
                    })),
                },
            },
            include: { tags: true },
        });

        return NextResponse.json({
            id: updated.id,
            type: updated.type,
            src: updated.src,
            alt: updated.alt,
            tags: updated.tags.map((t) => t.name),
        });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

