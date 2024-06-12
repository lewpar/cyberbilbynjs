import { getBlogPost } from "@/database/blog";
import { BlogPost } from "@/database/models/BlogPost";

export default async function Page({ params }: { params: { slug: string } }) {
    let post: (BlogPost | null) = await getBlogPost(params.slug);
    if(post == null) {
        return (<div>No post found with that name.</div>);
    }

    var showdown = require('showdown'),
    converter = new showdown.Converter(),
    text      = post.content,
    html      = converter.makeHtml(text);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex flex-col gap-10">
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