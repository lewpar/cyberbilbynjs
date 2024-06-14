function NavButton({ text, href, icon }: { text: string, href: string, icon: string }) {
    return (
        <a href={href} className="flex flex-row gap-1 items-center">
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}

export default async function NavMenu() {
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