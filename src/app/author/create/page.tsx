import ActionSidebar from "@/app/components/auth/AdminSidebar/ActionSidebar";
import CreatePost from "@/app/components/blog/CreatePost";

export default async function Page() {
    return (
        <div className="flex flex-row p-4">
            <ActionSidebar/>
            <div className="flex-1 p-4">
                <CreatePost/>
            </div>
        </div>
    );
}