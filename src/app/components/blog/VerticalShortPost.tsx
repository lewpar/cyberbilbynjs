import Image from "next/image";

import { BlogShortPost } from "@/models/BlogTypes";

export default function VerticalShortPost({ post }: { post: BlogShortPost }) {
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex bg-white rounded-l items-center justify-center p-6">
                <Image 
                    src={`/images/post/${post.coverImage}`}
                    width={256} height={128}
                    className="rounded"
                    alt="Cover Image"
                />
            </div>
            <div className="flex-1 flex flex-col p-4 bg-white gap-2">
                <div className="text-xl font-bold">
                    {post.title}
                </div>
                <div className="flex flex-col italic text-sm">
                    <div>{post.author}</div>
                    <div>{post.date.toLocaleDateString()}</div>
                </div>
                <div className="flex-1">
                    {post.content}
                </div>
                <a href={`/blog/post/${post.slug}`} className="text-sm text-white bg-slate-700 hover:bg-slate-600 self-start p-2 transition rounded">Read more</a>
            </div>
        </div>
    );
}