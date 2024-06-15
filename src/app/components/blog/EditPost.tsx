'use client';

import { BlogPost } from "@/models/BlogTypes";
import { FormEvent, useState } from "react";

export default function EditPost({ posts }: { posts: BlogPost[] }) {
    let clicked: string = "";

    let [blogPosts, setBlogPosts] = useState(posts);
    let [currentPost, setCurrentPost] = useState(posts[0]);
    let [hasError, setHasError] = useState(false);
    let [error, setError] = useState("");
    let [isPosting, setIsPosting] = useState(false);
    let [hasSucceeded, setHasSucceeded] = useState(false);
    let [success, setSuccess] = useState("");

    let onSelectionChanged = (slug: string) => {
        blogPosts.forEach(post => {
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
            return false;
        }

        setSuccess("Post updated");
        
        return true;
    };

    let onDeletePost = async () => {
        let formData = new FormData();
        formData.append("slug", currentPost.slug);

        const response = await fetch('/api/blog/post', {
            method: 'DELETE',
            body: formData,
        });

        let body = await response.json();
        if(!response.ok) {
            setHasError(true);
            setError(body.message);
            setIsPosting(false);
            return false;
        }

        let newPosts = blogPosts.filter(post => post.slug != currentPost.slug);
        setBlogPosts(newPosts);

        setSuccess("Post deleted");
        
        return true;
    };

    let onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setHasError(false);
        setError('');
        setHasSucceeded(false);

        if(isPosting) {
            return;
        }

        setIsPosting(true);

        let succeeded = false;

        if(clicked === "update") {
            succeeded = await onUpdatePost(event);
        }

        if(clicked === "delete") {
            succeeded = await onDeletePost();
        }

        setHasSucceeded(succeeded);
        setIsPosting(false);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="text-2xl font-bold">Edit Post</div>

            <div className="flex flex-col">
                <label htmlFor="posts" className="font-bold">Posts</label>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-60">
                    {
                        blogPosts.map((post, id) => 
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
            <div className="flex flex-row gap-3">
                <button type="submit" onClick={() => { clicked = "update" }} className="flex-1 border-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white p-4 rounded-md transition" disabled={isPosting}>Update</button>
                <button type="submit" onClick={() => { clicked = "delete" }} className="border-2 bg-red-500 hover:bg-red-400 disabled:bg-red-100 text-white p-4 rounded-md transition" disabled={isPosting}>Delete Post</button>
            </div>

            {hasError ? <p className="text-red-500">{`${error}`}</p> : ''}
            {hasSucceeded ? <p className="text-lime-500">{`${success}`}</p> : ''}
        </form>
    );
}