'use client';

import { usePathname } from "next/navigation";
import { LoginButton, LogoutButton } from "./auth/Buttons";

function NavButton({ text, href, icon }: { text: string, href: string, icon: string }) {
    const path = usePathname();

    let style = "flex flex-row gap-1 items-center text-slate-400 hover:text-slate-100 transition";

    if(href == path) {
        style = "flex flex-row gap-1 items-center text-slate-100 hover:text-slate-100 transition";
    }

    return (
        <a href={href} className={style}>
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}

export default function NavMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <ul className="flex-1 flex flex-row py-4 pr-4">
            <div className="flex flex-1 flex-row gap-4 items-center">
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

            <div className="flex flex-row gap-4 items-center">
                {
                    isLoggedIn ? 
                    <LogoutButton/> :
                    <LoginButton/>
                }
            </div>
        </ul>
    );
}