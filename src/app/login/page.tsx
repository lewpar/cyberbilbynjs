import { auth } from "@/auth";
import { GitHubLoginButton } from "../components/auth/Buttons";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] } }) {
    let session = await auth();
    if(session) {
        redirect('/');
    }
    
    return (
        <div>
            <GitHubLoginButton redirect={ searchParams?.redirectTo as string ?? "/"}/>
        </div>
    );
}