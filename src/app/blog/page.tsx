import { getBlogShortPosts, getFeaturedBlogShortPosts, isAuthorizedAuthor } from "@/lib/blog";
import { BlogShortPost } from "@/models/BlogTypes"
import { RouteButton } from "../components/Buttons";
import ShortPost from "../components/blog/ShortPost";

export default async function Page() {
    let isAuthorized = await isAuthorizedAuthor();

    let totalFeaturedPosts: number = 3;
    let featuredPosts: BlogShortPost[] = (await getFeaturedBlogShortPosts()).slice(0, totalFeaturedPosts);

    let totalRecentPosts: number = 5;
    let recentPosts: BlogShortPost[] = (await getBlogShortPosts()).slice(0, totalRecentPosts);

    return (
        <div className="flex-1 flex flex-col gap-4 p-4 w-3/4 self-center">
            { 
                isAuthorized ?
                <div className="flex-1 flex flex-col">
                    <div className="text-xl font-bold">Actions</div>
                    <div className="flex flex-row gap-1">
                        <RouteButton 
                            text="Create Post"
                            href="/author/create"
                            icon="ph ph-note-pencil"
                        />
                        <RouteButton
                            text="Manage"
                            href="/author"
                            icon="ph ph-gear"
                        />
                    </div>
                </div> : ''
            }
            <div className="flex-1 flex flex-col gap-1">
                <div className="text-xl font-bold">Featured</div>
                <div className="flex flex-row gap-4">
                    {
                        featuredPosts.length > 0 ?
                        featuredPosts.map((post, id) => 
                            <div className="flex-1" key={id}>
                                <ShortPost
                                    post={post}
                                />
                            </div>
                        ) :
                        <div>There are no featured posts.</div>
                    }
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <div className="text-xl font-bold">Recent</div>
                <div className="flex flex-col gap-4">
                    {
                        recentPosts.length > 0 ?
                        recentPosts.map((post, id) => 
                            <ShortPost
                                key={id}
                                post={post}
                            />
                        ) :
                        <div>There are no recent posts.</div>
                    }
                </div>
            </div>
            {
                (featuredPosts.length > 0 || recentPosts.length > 0) ?
                <div className="flex flex-row items-center justify-center">
                    <a className="nice-link" href={`/blog/1/`}>View All Posts</a>
                </div> : ''
            }
        </div>
    );
}