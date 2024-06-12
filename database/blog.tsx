import { BlogPost } from "./models/BlogPost";
import { BlogShortPost } from "./models/BlogShortPost"
import { getPrisma } from "./prisma";

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    let prisma = getPrisma();
    
    let post = await prisma.post.findFirst({ 
        include: {
            author: true
        },
        where: {
            slug: slug
        }
    });

    if(post == null) {
        return null;
    }

    return new BlogPost(post?.author.name, post.slug, post.title, post.content, post.date)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    let prisma = getPrisma();

    let posts = await prisma.post.findMany({
        include: {
            author: true
        }
    });
    
    return posts.map(p => {
        return new BlogPost(p.author.name, p.slug, p.title, p.content, p.date)
    });
}

export async function getBlogShortPosts(): Promise<BlogShortPost[]> {
    let prisma = getPrisma();

    let posts = await prisma.post.findMany({
        include: {
            author: true
        }
    });
    
    return posts.map(p => {
        return new BlogShortPost(p.author.name, p.slug, p.title, p.shortContent, p.date)
    });
}