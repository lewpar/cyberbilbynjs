import { isSessionValid } from "@/auth"

export default async function NavMenu() {
    let isLoggedIn = await isSessionValid();

    return (
        <ul className="flex flex-col gap-1">
            <div className="flex flex-row gap-4">
                <a href="/" className="flex flex-row gap-1 items-center justify-center">
                    <i className="ph ph-house"></i>
                    <li>Home</li>
                </a>
                <a href="/blog" className="flex flex-row gap-1 items-center justify-center">
                    <i className="ph ph-newspaper"></i>
                    <li>Blog</li>
                </a>
            </div>

            {
            isLoggedIn ? 
            <div>
                <a href="/blog/create" className="flex flex-row gap-1 items-center justify-center">
                    <i className="ph ph-note-pencil"></i>
                    <li>Create Post</li>
                </a>
            </div> : ''
            }
        </ul>
    );
}