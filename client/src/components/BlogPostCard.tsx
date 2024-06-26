import { BlogPost } from "../lib/types/blog-types";

export default function BlogPostCard({ post }: { post: BlogPost }) {
    return (
        <div className="flex flex-col border border-stone-900 bg-black p-4">
            <div>{post.title}</div>
            <div>{post.shortContent}</div>
        </div>
    );
}