import { Link } from "react-router-dom";

export default function PhosLink({ to, icon, text, className }: { to: string, icon: string, text: string, className?: string }) {
    return (
        <Link to={to} className={`flex flex-row gap-2 justify-center items-center ${className ?? ""}`}>
            <i className={icon}></i>
            <div>{text}</div>
        </Link>
    )
}