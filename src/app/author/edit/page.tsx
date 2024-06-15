import ActionSidebar from "@/app/components/auth/AdminSidebar/ActionSidebar";
import EditPost from "@/app/components/blog/EditPost";
import { getBlogPosts } from "@/lib/blog";

export default async function Page() {
    let posts = await getBlogPosts();

    return (
        <div className="flex flex-col tablet:flex-row p-4">
            <ActionSidebar/>
            <div className="flex-1 p-4">
                <EditPost posts={posts}/>
            </div>
        </div>
    );
}