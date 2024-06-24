import { BasicApiResponse } from "./types/api-types";
import { BlogPost } from "./types/blog-types";

export async function getPosts(): Promise<BlogPost[]> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/blog/list`, { mode:"cors" });

        if(!response.ok) {
            console.log(`Failed to fetch blog posts with API error: ${response.status} : ${response.statusText}`);
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
    catch(error) {
        console.log(`Failed to fetch blog posts with error: ${error}`);
        return [];
    }
}

export async function createPost(title: string, shortContent: string, content: string): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/blog/create`, { 
            mode:"cors",
            method: "POST",
            credentials: "include", // Must be included to save the Http-Only cookie provided by Set-Cookie header
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                Title: title,
                ShortContent: shortContent,
                Content: content
            })
        });

        if(!response.ok) {
            console.log(`Failed to create blog post with error: ${response.status} : ${response.statusText}`)
            return await response.json() as BasicApiResponse;
        }

        return { success: true, message: "Post created" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to create blog post with error: ${error}`);
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}