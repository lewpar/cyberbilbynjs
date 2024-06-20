import { Link } from "react-router-dom";

export default function PhosLink({ href, icon, text }: { href: string, icon: string, text: string }) {
    return (
        <Link to={href} className="flex flex-row gap-1 items-center hover:text-white transition">

            <div>{text}</div>
        </Link>
    )
}