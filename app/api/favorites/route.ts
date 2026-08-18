import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const favoriteSchema = z.object({
    articleUrl: z.string().url(),
});

export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, { status: 401 });
    }

    const favorites = await prisma.favoriteArticle.findMany({
        where: { userId: session.user.id },
        select: { articleUrl: true },
    });

    return NextResponse.json(favorites.map((f) => f.articleUrl));

}

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = favoriteSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Ugyldig forespørgsel" }, {
            status: 400 });
    }

    const { articleUrl } = parsed.data;

    await prisma.favoriteArticle.upsert({
        where: { userId_articleUrl: { userId: session.user.id, articleUrl } },

        create: { userId: session.user.id, articleUrl },
        update:  {},
    });

    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized "}, { status: 401 });
    }

    const body = await request.json();
    const parsed = favoriteSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Ugyldig forespørgsel" }, {
            status: 400 });
    }

    const { articleUrl } = parsed.data;

    await prisma.favoriteArticle.deleteMany({
        where: { userId: session.user.id, articleUrl },
    });

    return NextResponse.json({ success: true });
}