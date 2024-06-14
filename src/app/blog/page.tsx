import { isSessionValid } from "@/auth";
import { getFeaturedBlogShortPosts, isAuthorizedAuthor } from "@/lib/blog";
import { BlogShortPost } from "@/models/BlogTypes"
import Button from "../components/Button";
import ShortPost from "../components/blog/ShortPost";

export default async function Page() {
    let isAuthorized = await isAuthorizedAuthor();

    let posts: BlogShortPost[] = await getFeaturedBlogShortPosts();
    let totalPosts: number = 5;

    let featured: BlogShortPost[] = posts.slice(0, totalPosts);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="text-xl font-bold">Featured</div>
            { 
                isAuthorized ?
                <div className="flex flex-col border-r-2">
                    <div>Author Controls</div>
                    <Button 
                        text="Create Post"
                        href="/blog/create"
                        icon="ph ph-note-pencil"
                    />
                </div> : ''
            }
            {
                featured.map((post, id) => 
                    <ShortPost
                        key={id}
                        post={post}
                    />
                )
            }
            <div className="flex flex-row items-center justify-center">
                <a className="nice-link" href={`/blog/1/`}>All Posts</a>
            </div>
        </div>
    );
}