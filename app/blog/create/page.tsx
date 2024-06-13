import CreatePost from "@/app/components/blog/CreatePost";
import { isAuthorizedAuthor } from "@/database/blog";
import { notFound } from "next/navigation";

export default async function Page() {
    let isAuthorized = await isAuthorizedAuthor();
    if(!isAuthorized) {
        notFound();
    }

    return (
        <CreatePost/>
    );
}