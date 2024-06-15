"use client";

import { usePathname } from "next/navigation";

export default function ActionButton({ href, text, icon }: { href: string, text: string, icon: string }) {
    let path = usePathname();

    let style = "flex flex-row items-center px-4 py-2 gap-2 text-gray-300 hover:text-white bg-slate-800 hover:bg-slate-600 transition";

    if(href == path) {
        style = "flex flex-row items-center px-4 py-2 gap-2 text-white bg-slate-600 transition";
    }

    return (
        <a href={href} className={style}>
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}