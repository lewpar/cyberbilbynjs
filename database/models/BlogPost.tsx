export class BlogPost {
    author: string;
    slug: string;
    title: string;
    content: string;
    date: Date;

    constructor(author: string, slug: string, title: string, content: string, date: Date) {
        this.author = author;
        this.slug = slug;
        this.title = title;
        this.content = content;
        this.date = date;
    }
}