import UserDetails from "../UserDetails";
import ActionButton from "./ActionButton";
import ActionHeader from "./ActionHeader";

export default function ActionSidebar() {
    return (
        <div className="flex flex-col text-white bg-slate-800 rounded-sm">
            <UserDetails/>
            <ActionButton href="/author" text="Dashboard" icon="ph ph-browsers"/>
            <ActionHeader text="Blog"/>
            <ActionButton href="/author/create" text="Create Post" icon="ph ph-note-pencil"/>
        </div>
    );
}