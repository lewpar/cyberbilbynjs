import { getTotalPosts } from "@/lib/blog";

export default async function BlogDetails() {
    let totalPosts = await getTotalPosts();

    return (
        <div className="flex flex-col">
            <div className="font-bold">Blog Details</div>
            <div className="flex flex-col">
                <div>Total Posts: {totalPosts}</div>
            </div>
        </div>
    );
}