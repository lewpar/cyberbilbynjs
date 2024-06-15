'use client';

import { BlogPost } from "@/models/BlogTypes";
import { FormEvent, useState } from "react";

export default function EditPost({ posts }: { posts: BlogPost[] }) {
    let [currentPost, setCurrentPost] = useState(posts[0]);
    let [hasError, setHasError] = useState(false);
    let [error, setError] = useState('');
    let [isPosting, setIsPosting] = useState(false);
    let [hasSucceeded, setHasSucceeded] = useState(false);

    let onSelectionChanged = (slug: string) => {
        posts.forEach(post => {
            if(post.slug == slug) {
                setCurrentPost(post);
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

    let onUpdatePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setHasError(false);
        setError('');
        setHasSucceeded(false);

        // Wait for previous post to finish posting.
        if(isPosting) {
            return;
        }

        setIsPosting(true);
    
        let formData = new FormData(event.currentTarget);
        formData.append("slug", currentPost.slug);

        const response = await fetch('/api/blog/post', {
            method: 'PUT',
            body: formData,
        });

        let body = await response.json();
        if(!response.ok) {
            setHasError(true);
            setError(body.message);
            setIsPosting(false);
            return;
        }

        setHasSucceeded(true);
        setIsPosting(false);
        //TODO: Send UPDATE request for updating post content.
    };

    return (
        <form onSubmit={onUpdatePost} className="flex flex-col gap-4">
            <div className="text-2xl font-bold">Edit Post</div>

            <div className="flex flex-col">
                <label htmlFor="posts" className="font-bold">Posts</label>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-60">
                    {
                        posts.map((post, id) => 
                            <button key={id} type="button" onClick={(e) => { onSelectionChanged(post.slug) }} 
                                    className={`p-3 border-2 ${post.slug == currentPost.slug ? "text-white bg-slate-800 border-slate-900" : "bg-white"}`}>
                                <div className="flex flex-col">
                                    {
                                        post.featured ? 
                                        <div className="flex flex-row gap-1 items-center font-bold">
                                            <i className="ph ph-seal-warning"></i>
                                            <div>Featured</div>
                                        </div> : ""
                                    }
                                    <div className="text-start">
                                        <div className="text-lg font-bold">{post.title}</div>
                                        <div className="text-sm">Posted by {post.author} - {post.date.toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-sm italic text-start">{post.shortContent}</div>
                                </div>
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="content" className="font-bold">Content</label>
                <textarea name="content" rows={10} value={currentPost.content} onChange={onContentChanged} className="border-2 p-2"></textarea>
            </div>
            <button type="submit">Update</button>
            {hasError ? <p className="text-red-500">{`${error}`}</p> : ''}
            {hasSucceeded ? <p className="text-lime-500">Post updated.</p> : ''}
        </form>
    );
}