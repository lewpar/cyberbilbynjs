import Logo from "../Logo";
import NavMenu from "../NavMenu";
import VerticalDivider from "../VerticalDivider";

export default function Header() {
    return (
        <header className="flex flex-row gap-4 items-center bg-slate-800 text-slate-300 p-4">
            <Logo/>
            <VerticalDivider/>
            <NavMenu/>
        </header>
    );
}