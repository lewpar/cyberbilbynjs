import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostBySlug } from "../../lib/blog";
import { BlogPostDto } from "../../lib/types/blog-types";

export default function BlogPost() {
    const slug = useLocation().pathname.toLowerCase().split("/blog/").pop();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<BlogPostDto>();

    useEffect(() => {
        getPostBySlug(slug!).then(post => {
            if(!post) {
                navigate("/blog");
            }

            setPost(post as BlogPostDto);
            setIsLoading(false);
        });
    }, [slug, setPost, setIsLoading, navigate]);

    return (
        <div>
            { isLoading ? 
                <div>Loading Post..</div> :
                <div>
                    {post?.title}
                </div> 
            }
        </div>
    );
}