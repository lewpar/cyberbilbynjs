import AdminPage from "@/app/components/auth/AdminPage";
import CreatePost from "@/app/components/blog/CreatePost";

export default async function Page() {
    return (
        <AdminPage>
            <CreatePost/>
        </AdminPage>
    );
}