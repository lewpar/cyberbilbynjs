export class BlogShortPost {
    author: string;
    slug: string;
    title: string;
    shortContent: string;
    date: Date;

    constructor(author: string, slug: string, title: string, shortContent: string, date: Date) {
        this.author = author;
        this.slug = slug;
        this.title = title;
        this.shortContent = shortContent;
        this.date = date;
    }
}