import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="flex flex-row gap-2 items-center hover:text-white transition">
            <img 
                src="./images/bilby.png"
                width={48} height={48}
                alt="Cyber Bilby Logo"
            />
            <div className="text-xl">Cyber Bilby</div>
        </Link>
    );
}