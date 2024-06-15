import AdminPage from "@/app/components/auth/AdminPage";
import ActionSidebar from "@/app/components/auth/AdminSidebar/ActionSidebar";
import EditPost from "@/app/components/blog/EditPost";
import { getBlogPosts } from "@/lib/blog";

export default async function Page() {
    let posts = await getBlogPosts();

    return (
        <AdminPage>
            <EditPost posts={posts}/>
        </AdminPage>
    );
}