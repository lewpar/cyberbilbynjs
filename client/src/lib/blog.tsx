import { BasicApiResponse } from "./types/api-types";
import { BlogPostDto } from "./types/blog-types";

export async function getPosts(): Promise<BlogPostDto[]> {
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
                slug: post.slug,
                shortContent: post.shortContent
            } as BlogPostDto
        });

    }
    catch(error) {
        console.log(`Failed to fetch blog posts with error: ${error}`);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDto | null> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/blog/post/${slug}`, { mode:"cors" });

        if(!response.ok) {
            console.log(`Failed to fetch blog post with API error: ${response.status} : ${response.statusText}`);
            return null;
        }

        return await response.json() as BlogPostDto;
    }
    catch(error) {
        console.log(`Failed to fetch blog post with error: ${error}`);
        return null;
    }
}

export async function createPost(title: string, slug: string, shortContent: string, content: string, coverImageEncoded: string): Promise<BasicApiResponse> {
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
                Slug: slug,
                ShortContent: shortContent,
                Content: content,
                CoverImage: coverImageEncoded
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