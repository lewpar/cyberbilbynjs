export default function BlogPostCard({ title, content }: { title: string, content: string }) {
    return (
        <div className="flex flex-col border p-4">
            <div>{title}</div>
            <div>{content}</div>
        </div>
    );
}