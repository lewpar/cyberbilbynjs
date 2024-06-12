import { getBlogShortPosts } from "@/database/blog";
import { BlogShortPost } from "@/database/models/BlogShortPost";

export default async function Page() {
    let posts: BlogShortPost[] = await getBlogShortPosts();

    return (
        <div className="flex flex-col gap-4 p-4">
            {
                posts.map((post, id) => 
                    <div key={id} className="flex flex-col border-2 p-4 bg-white gap-2">
                        <div className="text-xl font-bold">
                            {post.title}
                        </div>
                        <div className="flex flex-col italic text-sm">
                            <div>{post.author}</div>
                            <div>{post.date.toLocaleDateString()}</div>
                        </div>
                        <div>
                            {post.shortContent}
                        </div>
                        <a href={`/blog/${post.slug}`} className="text-blue-800">Read More</a>
                    </div>
                )
            }
        </div>
    );
}