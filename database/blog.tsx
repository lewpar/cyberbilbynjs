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

export async function getFeaturedBlogShortPosts(): Promise<BlogShortPost[]> {
    let prisma = getPrisma();

    let posts = await prisma.post.findMany({
        where: {
            featured: true
        },
        include: {
            author: true
        }
    });
    
    return posts.map(p => {
        return new BlogShortPost(p.author.name, p.slug, p.title, p.shortContent, p.date)
    });
}

export async function slugExists(slug: string): Promise<boolean> {
    let prisma = getPrisma();

    let post = await prisma.post.findFirst({
        where: {
            slug: slug
        }
    });

    if(post == null) {
        return false;
    }

    return true;
}

export async function createPost(title: string, slug: string, shortContent: string, content: string, isFeatured: boolean): Promise<boolean> {
    let prisma = getPrisma();

    let post = await prisma.post.create({
        data: {
            title: title,
            slug: slug,
            content: content,
            shortContent: shortContent,
            featured: isFeatured,
            authorId: 1,
            date: new Date().toISOString()
        }
    });

    console.log(post);

    if(post == null) {
        return false;
    }
    
    return true;
}