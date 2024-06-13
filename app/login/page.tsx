import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    let session = await auth();

    if(session != null) {
        redirect("/");
    }

    const onSubmit = async () => {
        "use server";
        await signIn("google");
    };

    return (
        <form action={onSubmit} method="POST">
            <button type="submit">Sign in with Google</button>
        </form>
    );
}