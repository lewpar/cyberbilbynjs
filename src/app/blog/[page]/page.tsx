import ShortPost from "@/app/components/blog/ShortPost";
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
        <div className="flex flex-col gap-4 p-4 w-3/4 self-center">
            <div className="text-xl font-bold">Posts</div>
            {
                paginated.length > 0 ?
                paginated.map((post, id) => 
                    <ShortPost
                        key={id}
                        post={post}
                    />
                ) :
                <div>There are no posts.</div>
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