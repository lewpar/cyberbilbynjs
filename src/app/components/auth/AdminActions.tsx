import { auth } from "@/auth";

async function UserDetails() {
    let session = await auth();
    
    return (
        <div className="flex flex-col p-4 m-4 bg-slate-700 rounded-md">
            <div className="text-sm">{session?.user?.name}</div>
            <div className="text-xs">{session?.user?.email}</div>
        </div>
    );
}

function ActionHeader({ text }: { text: string }) {
    return (
        <div className="text-gray-400 bg-slate-800 px-4 pt-4">
        {text}
        </div>
    );
}

function ActionButton({ href, text, icon }: { href: string, text: string, icon: string }) {
    return (
        <a href={href} className="flex flex-row items-center px-4 py-2 gap-2 text-gray-300 hover:text-white bg-slate-800 hover:bg-slate-600 transition">
            <i className={icon}></i>
            <div>{text}</div>
        </a>
    );
}

export default function AdminActions() {
    return (
        <div className="flex flex-col text-white bg-slate-800 rounded-md">
            <UserDetails/>
            <ActionButton href="/author" text="Dashboard" icon="ph ph-browsers"/>
            <ActionHeader text="Blog"/>
            <ActionButton href="/author/create" text="Create Post" icon="ph ph-note-pencil"/>
        </div>
    );
}