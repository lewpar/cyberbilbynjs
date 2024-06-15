import AdminActions from "@/app/components/auth/AdminActions";
import CreatePost from "@/app/components/blog/CreatePost";

export default async function Page() {
    return (
        <div className="flex flex-row p-4">
            <AdminActions/>
            <div className="flex-1 p-4">
                <CreatePost/>
            </div>
        </div>
    );
}