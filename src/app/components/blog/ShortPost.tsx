import Image from "next/image";

import { BlogShortPost } from "@/models/BlogTypes";

export default function ShortPost({ post }: { post: BlogShortPost }) {
    return (
        <div className="flex flex-col tablet:flex-row">
            <div className="flex bg-white rounded-l items-center justify-center tablet:max-w-60">
                <Image 
                    src={`/images/post/${post.coverImage}`}
                    width={512} height={256}
                    className="rounded-t tablet:rounded-none tablet:rounded-l object-cover max-h-48 tablet:max-h-full h-full"
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
                <div>
                    {post.content}
                </div>
                <a href={`/blog/post/${post.slug}`} className="text-sm text-white bg-slate-700 hover:bg-slate-600 self-start p-2 transition rounded">Read more</a>
            </div>
        </div>
    );
}