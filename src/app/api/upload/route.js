import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req) {
    try {
        const form = await req.formData();

        // ✅ 1 ou plusieurs fichiers
        const files = form.getAll("files"); // <input name="files" multiple />
        const alt = String(form.get("alt") || "");
        const tagsRaw = String(form.get("tags") || "");

        if (!files.length || typeof files[0] === "string") {
            return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
        }

        // ✅ tags sous forme de noms
        const tagNames = tagsRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        // ⚠️ Service role uniquement côté serveur
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const bucket = "images";
        const createdRows = [];

        for (const file of files) {
            if (typeof file === "string") continue;

            const bytes = Buffer.from(await file.arrayBuffer());

            const safeName = (file.name || "file").replace(/\s+/g, "-");
            const filename = `${crypto.randomUUID()}-${safeName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filename, bytes, {
                    contentType: file.type || "application/octet-stream",
                    upsert: false,
                });

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            const { data: pub } = supabase.storage.from(bucket).getPublicUrl(filename);
            const publicUrl = pub.publicUrl;

            // 🔥 Crée la ligne en DB + crée/associe les tags (relation)
            const row = await prisma.image.create({
                data: {
                    type: "image",
                    src: publicUrl,
                    alt,
                    tags: {
                        connectOrCreate: tagNames.map((name) => ({
                            where: { name },     // nécessite Tag.name @unique
                            create: { name },
                        })),
                    },
                },
                include: { tags: true },
            });

            // ✅ On renvoie tags comme ["noel", ...] (comme ton front l'attend)
            createdRows.push({
                ...row,
                tags: row.tags.map((t) => t.name),
            });
        }

        return NextResponse.json({ ok: true, created: createdRows });
    } catch (e) {
        return NextResponse.json({ error: e?.message || "Erreur upload" }, { status: 500 });
    }
}
