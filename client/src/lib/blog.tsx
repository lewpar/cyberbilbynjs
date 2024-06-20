import { BlogPost } from "./types/blog-types";

export async function getPosts(): Promise<BlogPost[]> {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/blog/posts`, { mode:"cors" });

    if(!response.ok) {
        console.log(`Failed to fetch blog posts with error: ${response.status} : ${response.statusText}`)
        return [];
    }

    let posts = await response.json();

    return posts.map((post: any) => {
        return {
            title: post.title,
            shortContent: post.shortContent
        } as BlogPost
    });
}