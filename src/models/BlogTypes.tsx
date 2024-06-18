export type BlogPost = {
    id: number;
    author: string;
    slug: string;
    title: string;
    content: string;
    shortContent: string;
    date: Date;
    featured: boolean;
    coverImage: string;
}

export type BlogShortPost = {
    id: number;
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