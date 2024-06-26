import Logo from "../Logo";
import NavMenu from "../NavMenu";

export default function Sidebar() {
    return (
        <header className="flex flex-col items-center bg-black text-slate-300">
            <Logo/>
            <NavMenu/>
        </header>
    );
}