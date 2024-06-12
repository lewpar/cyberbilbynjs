import { BlogPost } from "./models/BlogPost";
import { getPrisma } from "./prisma";

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    let prisma = getPrisma();
    
    let post = await prisma.posts.findFirst({ 
        where: {
            slug: slug
        }
    });

    if(post == null) {
        return null;
    }

    let author = await prisma.authors.findFirst({
        where: {
            id: post.author
        }
    });

    if(author == null) {
        return null;
    }

    return new BlogPost(author.name, post.title, post.content, post.date)
}