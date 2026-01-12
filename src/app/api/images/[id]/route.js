import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function extractStoragePathFromPublicUrl(src, bucket) {
    try {
        if (!src || !src.startsWith("http")) return null;

        const url = new URL(src);
        const marker = `/storage/v1/object/public/${bucket}/`;
        const idx = url.pathname.indexOf(marker);

        if (idx === -1) return null;

        const path = url.pathname.slice(idx + marker.length);
        return decodeURIComponent(path);
    } catch {
        return null;
    }
}

export async function DELETE(req, ctx) {
    const auth = await requireAdmin();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const params = await ctx.params;
    const id = Number(params.id);

    if (Number.isNaN(id)) {
        return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    try {
        const img = await prisma.image.findUnique({
            where: { id },
            select: { src: true },
        });

        if (!img) {
            return NextResponse.json({ error: "Image introuvable" }, { status: 404 });
        }

        const bucket = process.env.SUPABASE_STORAGE_BUCKET || "images";
        const storagePath = extractStoragePathFromPublicUrl(img.src, bucket);

        if (storagePath) {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            const { error: storageErr } = await supabase.storage
                .from(bucket)
                .remove([storagePath]);

            if (storageErr) {
                console.error("Supabase Storage remove error:", storageErr);
                return NextResponse.json(
                    { error: `Suppression Storage impossible: ${storageErr.message}` },
                    { status: 500 }
                );
            }
        }

        await prisma.image.delete({ where: { id } });

        return NextResponse.json({
            ok: true,
            deletedId: id,
            deletedFromStorage: Boolean(storagePath),
        });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PUT(req, ctx) {
    const auth = await requireAdmin();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const params = await ctx.params;
    const id = Number(params.id);

    if (!id) {
        return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { type, src, alt, tags } = body;

        const cleanTags = Array.isArray(tags)
            ? tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean)
            : [];

        // ✅ on ne modifie que ce qu'on reçoit
        const dataToUpdate = {
            alt: alt ?? "",
            tags: {
                set: [],
                connectOrCreate: cleanTags.map((name) => ({
                    where: { name },
                    create: { name },
                })),
            },
        };

        if (typeof type === "string" && type.trim() !== "") {
            dataToUpdate.type = type;
        }

        if (typeof src === "string" && src.trim() !== "") {
            dataToUpdate.src = src;
        }

        const updated = await prisma.image.update({
            where: { id },
            data: dataToUpdate,
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
