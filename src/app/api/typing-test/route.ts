import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { wpm } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const typingTest = await prisma.typingTest.create({
            data: {
                userId: user.id,
                wpm: wpm,
            },
        });

        // update user's highest WPM if current WPM is higher
        if (wpm > user.highestWpm) {
            await prisma.user.update({
                where: { id: user.id },
                data: { highestWpm: wpm },
            });
        }

        return NextResponse.json({ success: true, typingTest })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}