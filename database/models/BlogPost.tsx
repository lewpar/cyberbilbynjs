export class BlogPost {
    author: string;
    title: string;
    content: string;
    date: Date | null;

    constructor(author: string, title: string, content: string, date: Date | null) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.date = date;
    }
}