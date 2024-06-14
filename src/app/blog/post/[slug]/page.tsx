import { getBlogPost } from "@/lib/blog";
import { BlogPost } from "@/models/BlogTypes";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    let post: (BlogPost | null) = await getBlogPost(params.slug);
    if(post == null) {
        notFound();
    }

    var showdown = require('showdown'),
    converter = new showdown.Converter(),
    text      = post.content,
    html      = converter.makeHtml(text);

    return (
        <div className="flex flex-col items-center p-4 w-3/4 self-center">
            <div className="flex w-full flex-col gap-10">
                <div className="text-5xl">{post.title}</div>
                <div className="flex flex-col">
                    <div><b>Author:</b> {post.author}</div>
                    <div><b>Date:</b> {post.date?.toLocaleDateString()}</div>
                </div>
                <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}