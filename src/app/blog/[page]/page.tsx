import { getBlogShortPosts } from "@/lib/blog";
import { BlogShortPost } from "@/models/BlogTypes";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { page: string } }) {
    let pageNumber = Number(params.page);

    if(Number.isNaN(pageNumber)) {
        notFound();
    }

    let posts: BlogShortPost[] = await getBlogShortPosts();
    let postsPerPage = 5;

    let totalPages = Math.ceil(posts.length / postsPerPage);

    let indexStart = postsPerPage * (pageNumber - 1);
    let indexEnd = pageNumber * postsPerPage;

    let paginated: BlogShortPost[] = posts.slice(indexStart, indexEnd);

    return (
        <div className="flex flex-col gap-4 p-4">
            {
                paginated.length < 1 ? 'No posts found.' : ''
            }
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
                            {post.content}
                        </div>
                        <a href={`/blog/post/${post.slug}`} className="nice-link">Read More</a>
                    </div>
                )
            }
            <div className="flex flex-row gap-4 items-center justify-center">
            {
                pageNumber > 1 ? <a className="nice-link" href={`/blog/${pageNumber - 1}`}>Previous Page</a> : ''
            }
            {
                totalPages > 1 && pageNumber < totalPages ? <a className="nice-link" href={`/blog/${pageNumber + 1}`}>Next Page</a> : ''
            }
            </div>
        </div>
    );
}