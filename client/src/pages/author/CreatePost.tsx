import { FormEvent, useState } from "react";
import { createPost } from "../../lib/blog";

export default function CreatePost() {
    let [error, setError] = useState("");
    let [hasError, setHasError] = useState(false);
    let [hasSucceeded, setHasSucceeded] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setHasSucceeded(false);
        setHasError(false);
        setError("");

        let formData = new FormData(event.currentTarget);

        let title = formData.get("title") as string;
        let shortContent = formData.get("short-content") as string;
        let content = formData.get("content") as string;

        let result = await createPost(title, shortContent, content);

        if(!result.success) {
            setError(result.message);
            setHasError(true);
            return;
        }

        setHasSucceeded(true);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 p-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" className="border border-slate-500 p-2"/>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="short-content">Short Content</label>
                <input type="text" name="short-content" className="border border-slate-500 p-2"/>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="content">Content</label>
                <textarea name="content" rows={8} className="border border-slate-500 p-2"/>
            </div>

            <button type="submit" className="border border-slate-500 p-2">Create Post</button>

            { hasError ? <div className="font-bold text-red-500">{error}</div> : "" }
            { hasSucceeded ? <div className="font-bold text-green-500">Post created.</div> : "" }
        </form>
    );
}