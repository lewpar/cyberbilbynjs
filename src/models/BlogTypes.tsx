export type BlogPost = {
    author: string;
    slug: string;
    title: string;
    content: string;
    shortContent: string;
    date: Date;
    featured: boolean;
}

export type BlogShortPost = {
    author: string;
    slug: string;
    title: string;
    content: string;
    date: Date;
    coverImage: string;
}

export type CreateBlogPost = {
    slug: string;
    title: string;
    content: string;
    shortContent: string;
    coverImage: string;
    featured: boolean;
}