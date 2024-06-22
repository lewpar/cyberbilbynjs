import { useEffect, useState } from "react";
import { getPosts } from "../lib/blog";
import { BlogPost } from "../lib/types/blog-types";
import BlogPostCard from "../components/BlogPostCard";
import Layout from "../components/layout/Layout";

export default function Blog() {
    let [posts, setPosts] = useState<BlogPost[]>();

    useEffect(() => {
        getPosts().then(posts => {
            setPosts(posts);
        });
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-1">
                <div className="font-bold">Posts</div>
                {
                    posts === undefined ?
                    <div>Loading posts..</div> :
                    <div className="flex flex-col gap-4">
                    { 
                        posts.length > 0 ?
                        posts.map(post => 
                            <BlogPostCard title={post.title} content={post.shortContent} />
                        ) : "No posts were found."
                    }
                </div>
                }
            </div>
        </Layout>
    );
}