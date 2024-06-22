import { FormEvent } from "react";
import AuthorLayout from "../../components/layout/AuthorLayout";

export default function CreatePost() {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <AuthorLayout>
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
            </form>
        </AuthorLayout>
    );
}