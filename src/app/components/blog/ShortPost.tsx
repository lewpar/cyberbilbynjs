import { BlogShortPost } from "@/models/BlogTypes";

export default function ShortPost({ post }: { post: BlogShortPost }) {
    return (
        <div className="flex flex-col border-2 p-4 bg-white gap-2">
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
    );
}