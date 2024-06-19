import { auth } from "@/auth";
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let session = await auth();

    if(!session) {
        return NextResponse.json({
            message: "You are not authenticated to access this resource."
        }, { status: 401 });
    }

    let prisma = getPrisma();
    let result = await prisma.author.findFirst({
        where: {
            email: session.user?.email!
        }
    });

    if(!result) {
        return NextResponse.json({
            message: "You are not authorized to access this resource."
        }, { status: 401 });
    }

    return NextResponse.json({}, { status: 200 });
}