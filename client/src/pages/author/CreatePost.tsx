import { FormEvent, useState } from "react";
import { createPost } from "../../lib/blog";
import AuthorPanel from "../../components/auth/AuthorPanel";

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
        let slug = formData.get("slug") as string;
        let shortContent = formData.get("short-content") as string;
        let content = formData.get("content") as string;

        let result = await createPost(title, slug, shortContent, content);

        if(!result.success) {
            setError(result.message);
            setHasError(true);
            return;
        }

        setHasSucceeded(true);
    };

    return (
        <AuthorPanel>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Slug</label>
                    <input type="text" name="slug" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="short-content">Short Content</label>
                    <input type="text" name="short-content" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" rows={8} className="nice-field"/>
                </div>

                <button type="submit" className="nice-button">Create Post</button>

                { hasError ? <div className="font-bold text-red-500">{error}</div> : "" }
                { hasSucceeded ? <div className="font-bold text-green-500">Post created.</div> : "" }
            </form>
        </AuthorPanel>
    );
}