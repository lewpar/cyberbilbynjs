import CreatePost from "@/app/components/blog/CreatePost";
import { isAuthorizedAuthor } from "@/database/blog";
import { redirect } from "next/navigation";

export default async function Page() {
    let isAuthorized = await isAuthorizedAuthor();
    if(!isAuthorized) {
        redirect('/');
    }

    return (
        <CreatePost/>
    );
}