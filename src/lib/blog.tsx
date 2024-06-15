import { auth } from "@/auth";
import { getPrisma } from "./prisma";
import { BlogPost, BlogShortPost } from "../models/BlogTypes";

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

    return {
        author: post.author.name, 
        slug: post.slug, 
        title: post.title, 
        content: post.content, 
        shortContent: post.shortContent,
        date: post.date,
        featured: post.featured
    } as BlogPost;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    let prisma = getPrisma();

    let posts = await prisma.post.findMany({
        include: {
            author: true
        },
        orderBy: {
            date: 'desc'
        }
    });
    
    return posts.map(p => {
        return {
            author: p.author.name, 
            slug: p.slug, 
            title: p.title, 
            content: p.content, 
            shortContent: p.shortContent,
            date: p.date,
            featured: p.featured
        } as BlogPost;
    });
}

export async function getBlogShortPosts(): Promise<BlogShortPost[]> {
    let prisma = getPrisma();

    let posts = await prisma.post.findMany({
        include: {
            author: true
        },
        orderBy: {
            date: 'desc'
        }
    });
    
    return posts.map(p => {
        return {
            author: p.author.name, 
            slug: p.slug, 
            title: p.title, 
            content: p.shortContent, 
            date: p.date
        } as BlogPost;
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
        },
        orderBy: {
            date: 'desc'
        }
    });
    
    return posts.map(p => {
        return {
            author: p.author.name, 
            slug: p.slug, 
            title: p.title, 
            content: p.shortContent, 
            date: p.date
        } as BlogPost;
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

async function getAuthorIdByEmail(email: string): Promise<number | null> {
    let prisma = getPrisma();

    let result = await prisma.author.findFirst({
        where: {
            email: email
        }
    });

    if(result == null) {
        return null;
    }

    return result.id;
}

export async function createPost(title: string, slug: string, shortContent: string, content: string, isFeatured: boolean): Promise<boolean> {
    let prisma = getPrisma();
    let session = await auth();

    let id = await getAuthorIdByEmail(session?.user?.email!);
    if(id == null) {
        return false;
    }

    let post = await prisma.post.create({
        data: {
            title: title,
            slug: slug,
            content: content,
            shortContent: shortContent,
            featured: isFeatured,
            authorId: id,
            date: new Date().toISOString()
        }
    });

    if(post == null) {
        return false;
    }
    
    return true;
}

export async function isAuthorizedAuthor(): Promise<boolean> {
    let session = await auth();

    if(!session) {
        return false;
    }

    if(!session.user?.email) {
        return false;
    }

    let prisma = getPrisma();

    let result = prisma.author.findFirst({
        where: {
            email: session?.user?.email
        }
    });

    if(!result) {
        return false;
    }

    return true;
}

export async function getTotalPosts(): Promise<number> {
    return await getPrisma().post.count();
}