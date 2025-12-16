import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
    try {
        const images = await prisma.image.findMany({
            orderBy: { id: "asc" },
            include: { tags: true },
        });

        // On renvoie EXACTEMENT le format de ton ancien JSON
        const formatted = images.map((img) => ({
            id: img.id,
            type: img.type,
            src: img.src,
            alt: img.alt,
            tags: img.tags.map((t) => t.name),
        }));

        return NextResponse.json(formatted);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
