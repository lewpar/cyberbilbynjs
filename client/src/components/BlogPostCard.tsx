import { Link } from "react-router-dom";
import { BlogPostDto } from "../lib/types/blog-types";

export default function BlogPostCard({ post }: { post: BlogPostDto }) {
    return (
        <div className="flex flex-col border border-stone-900 bg-black p-4">
            <div>{post.title}</div>
            <div>{post.shortContent}</div>
            <Link to={`/blog/${post.slug}`}>Read More</Link>
        </div>
    );
}