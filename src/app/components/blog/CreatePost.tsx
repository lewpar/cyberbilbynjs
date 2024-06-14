'use client';

import { FormEvent, useState } from "react";

export default function CreatePost() {
    let [hasError, setHasError] = useState(false);
    let [error, setError] = useState('');
    let [isPosting, setIsPosting] = useState(false);
    let [hasSucceeded, setHasSucceeded] = useState(false);

    let submitPost = async (event: FormEvent<HTMLFormElement>) => {
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
        const response = await fetch('/api/blog/post', {
            method: 'POST',
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
    }
    
    return (
        <form onSubmit={submitPost} method="POST" className="flex flex-col gap-4 p-4">
            <div className="text-2xl font-bold">Create Post</div>

            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-bold">Title</label>
                <p>The title of the blog post which will show up on the front page.</p>
                <input type="text" name="title" className="nice-field"></input>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="slug" className="font-bold">Slug</label>
                <p>The url slug, ex: https://website.com/blog/this-is-a-slug/</p>
                <input type="text" name="slug" className="nice-field"></input>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="short-content" className="font-bold">Short Content</label>
                <p>The short content of the post, which will show up on the front page.</p>
                <input type="text" name="short-content" className="nice-field"></input>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="content" className="font-bold">Content</label>
                <p>The content of the post.</p>
                <textarea name="content" className="nice-field" rows={10}></textarea>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                    <input type="checkbox" name="is-featured" className="nice-field"></input>
                    <label htmlFor="is-featured" className="font-bold">Featured</label>
                </div>
                <p>Shows the post on the blog featured page.</p>
            </div>

            <div>
                <button type="submit" className="nice-button" disabled={isPosting}>Create Post</button>
            </div>

            {hasError ? <p className="text-red-500">{`${error}`}</p> : ''}
            {hasSucceeded ? <p className="text-lime-500">Post submitted.</p> : ''}
        </form>
    );
}