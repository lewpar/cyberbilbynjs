import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    let session = await auth();
    if(session == null) {
        return redirect("/");
    }

    await signOut();

    return redirect("/");
}