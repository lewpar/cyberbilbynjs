import { getBlogShortPosts } from "@/database/blog";
import { BlogShortPost } from "@/database/models/BlogShortPost";

export default async function Page({ params }: { params: { page: number } }) {
    let posts: BlogShortPost[] = await getBlogShortPosts();

    let pageNumber = Number(params.page || 1);
    let postsPerPage = 5;

    let totalPages = Math.ceil(posts.length / postsPerPage);

    let indexStart = postsPerPage * (pageNumber - 1);
    let indexEnd = pageNumber * postsPerPage;

    let paginated: BlogShortPost[] = posts.slice(indexStart, indexEnd);

    return (
        <div className="flex flex-col gap-4 p-4">
            {
                paginated.map((post, id) => 
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
                        <a href={`/blog/post/${post.slug}`} className="text-blue-800">Read More</a>
                    </div>
                )
            }
            {
                totalPages > 1 && pageNumber < totalPages ? <a href={`/blog/${pageNumber + 1}`}>Next Page</a> : ''
            }
            {
                pageNumber > 1 ? <a href={`/blog/${pageNumber - 1}`}>Previous Page</a> : ''
            }
        </div>
    );
}