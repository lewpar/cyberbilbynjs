import { useEffect, useState } from "react";
import { getPosts } from "../lib/blog";
import { BlogPostDto } from "../lib/types/blog-types";
import BlogPostCard from "../components/BlogPostCard";

export default function Blog() {
    let [posts, setPosts] = useState<BlogPostDto[]>();

    useEffect(() => {
        getPosts().then(posts => {
            setPosts(posts);
        });
    }, []);

    return (
        <div className="flex flex-col gap-1 p-4">
            <div className="font-bold">Posts</div>
            {
                posts === undefined ?
                <div>Loading posts..</div> :
                <div className="flex flex-col gap-4">
                { 
                    posts.length > 0 ?
                    posts.map((post, index) => 
                        <BlogPostCard key={index} post={post} />
                    ) : "No posts were found."
                }
            </div>
            }
        </div>
    );
}