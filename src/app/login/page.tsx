import { auth } from "@/auth";
import { GitHubLoginButton } from "../components/auth/Buttons";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
    let session = await auth();
    if(session) {
        redirect('/');
    }
    
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2">
                <div className="text-2xl">Login</div>
                <GitHubLoginButton redirect={ searchParams?.redirectTo as string ?? "/"}/>
            </div>
        </div>
    );
}