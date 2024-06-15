import AdminActions from "../components/auth/AdminActions";
import BlogDetails from "../components/auth/BlogDetails";

export default function Page() {
    return (
        <div className="flex flex-row p-4">
            <AdminActions/>
            <div className="flex-1 p-4">
                <BlogDetails/>
            </div>
        </div>
    );
}