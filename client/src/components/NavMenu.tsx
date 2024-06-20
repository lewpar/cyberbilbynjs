import PhosLink from "./PhosLink";

export default function NavMenu() {
    return (
        <div>
            <ul>
                <li className="flex flex-row gap-4">
                    <PhosLink
                        href="/"
                        icon="ph ph-house"
                        text="Home"
                    />

                    <PhosLink
                        href="/blog"
                        icon="ph ph-house"
                        text="Blog"
                    />

                    <PhosLink
                        href="/register"
                        icon="ph ph-user"
                        text="Register"
                    />
                </li>
            </ul>
        </div>
    );
}