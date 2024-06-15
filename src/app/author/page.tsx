import ActionSidebar from "@/app/components/auth/AdminSidebar/ActionSidebar";
import BlogDetails from "../components/auth/BlogDetails";

export default function Page() {
    return (
        <div className="flex-1 flex flex-row p-4">
            <ActionSidebar/>
            <div className="flex-1 p-4">
                <BlogDetails/>
            </div>
        </div>
    );
}