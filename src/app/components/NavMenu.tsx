'use client';

import { usePathname } from "next/navigation";

function NavButton({ text, href, icon }: { text: string, href: string, icon: string }) {
    const path = usePathname();

    let style = "flex flex-row gap-1 items-center text-white hover:text-blue-500 transition";

    if(href == path) {
        style = "flex flex-row gap-1 items-center text-blue-500 hover:text-blue-500 transition";
    }

    return (
        <a href={href} className={style}>
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}

export default function NavMenu() {
    return (
        <ul className="flex flex-col gap-1">
            <div className="flex flex-row gap-4">
                <li>
                    <NavButton
                        text="Home"
                        href="/"
                        icon="ph ph-house"
                    />
                </li>

                <li>
                    <NavButton
                        text="Blog"
                        href="/blog"
                        icon="ph ph-newspaper"
                    />
                </li>
            </div>
        </ul>
    );
}