export function RouteButton({ text, href, icon }: { text: string, href: string, icon: string }) {
    return (
        <a href={href} className="flex flex-row gap-1 items-center border-0 p-2 self-start rounded-md text-slate-300 hover:text-slate-100 bg-slate-800 transition">
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}