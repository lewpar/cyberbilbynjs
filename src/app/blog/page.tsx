import { getFeaturedBlogShortPosts } from "@/database/blog";
import { BlogShortPost } from "@/database/models/BlogTypes"

export default async function Page() {

    let posts: BlogShortPost[] = await getFeaturedBlogShortPosts();
    let totalPosts: number = 5;

    let featured: BlogShortPost[] = posts.slice(0, totalPosts);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="text-xl font-bold">Featured</div>
            {
                featured.map((post, id) => 
                    <div key={id} className="flex flex-col border-2 p-4 bg-white gap-2">
                        <div className="text-xl font-bold">
                            {post.title}
                        </div>
                        <div className="flex flex-col italic text-sm">
                            <div>{post.author}</div>
                            <div>{post.date.toLocaleDateString()}</div>
                        </div>
                        <div>
                            {post.content}
                        </div>
                        <a href={`/blog/post/${post.slug}`} className="nice-link">Read More</a>
                    </div>
                )
            }
            <div className="flex flex-row items-center justify-center">
                <a className="nice-link" href={`/blog/1/`}>All Posts</a>
            </div>
        </div>
    );
}