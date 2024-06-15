'use client';

import { BlogPost } from "@/models/BlogTypes";
import { FormEvent, useState } from "react";

export default function EditPost({ posts }: { posts: BlogPost[] }) {
    let [currentPost, setCurrentPost] = useState(posts[0]);
    let [selectedSlug, setSelectedSlug] = useState(posts[0].slug);

    let onSelectionChanged = (slug: string) => {
        posts.forEach(post => {
            if(post.slug == slug) {
                console.log("slug found");
                setCurrentPost(post);
                setSelectedSlug(post.slug);
            }
        });
    };

    let onContentChanged = (event: any) => {
        let newPost = {
            ...currentPost,
            content: event.target.value
        };
        setCurrentPost(newPost);
    };

    let onUpdatePost = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        //TODO: Send UPDATE request for updating post content.
    };

    return (
        <form onSubmit={onUpdatePost} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="posts">Select a post: </label>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-60">
                    {
                        posts.map((post, id) => 
                            <button key={id} type="button" onClick={(e) => { onSelectionChanged(post.slug) }} className="p-2 border-2 bg-white">
                                <div className="flex flex-col">
                                    {
                                        post.featured ? 
                                        <div className="flex flex-row gap-1 items-center font-bold p-1">
                                            <i className="ph ph-seal-warning"></i>
                                            <div>Featured</div>
                                        </div> : ""
                                    }
                                    <div className="p-2 text-start">
                                        <div className="text-lg font-bold">{post.title}</div>
                                        <div className="text-sm">Posted by {post.author} - {post.date.toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="content">Content</label>
                <textarea rows={10} value={currentPost.content} onChange={onContentChanged} className="border-2 p-2"></textarea>
            </div>
            <button type="submit">Update</button>
        </form>
    );
}