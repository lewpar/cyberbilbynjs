import Image from "next/image";

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
        <div className="flex-1 flex flex-col items-center tablet:border-x-2 w-full tablet:w-3/4 self-center bg-white">
            <div className="self-stretch grid items-center">
                <div className="flex col-start-1 row-start-1 max-h-60">
                    <Image 
                        src={`/images/post/${post.coverImage}`}
                        width={256} height={128}
                        className="flex-1 object-cover brightness-50 bg-black"
                        alt="Cover Image"
                    />
                </div>
                <div className="relative flex items-center justify-center p-8 col-start-1 row-start-1">
                    <div className="flex flex-col gap-4 text-white">
                        <div className="text-5xl">
                            {post.title}
                        </div>
                        <div>
                            <div><b>Author:</b> {post.author}</div>
                            <div><b>Date:</b> {post.date?.toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col gap-10 p-8 tablet:px-20 tablet:py-20">
                <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}