export default function Button({ text, href, icon }: { text: string, href: string, icon: string }) {
    return (
        <a href={href} className="flex flex-row gap-1 items-center border rounded-sm p-2 self-start">
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}