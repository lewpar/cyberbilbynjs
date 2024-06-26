import "./AuthorPanel.tsx.css"

import PhosLink from "../PhosLink";
import { useAuth } from "../../hooks/useAuth";

/**
 * Embeds an author panel next to the author side menu.
 * 
 * All author pages should be a child of this component.
 */
export default function AuthorPanel({ children }: { children: any }) {
    const user = useAuth();

    return (
        <div className="flex-1 flex flex-row">
            <div className="flex-[1.5] flex flex-col gap-4 text-white bg-slate-800 py-4">
                <div className="flex flex-col gap-1 px-2">
                    <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-md p-2">
                        <div className="text-slate-300 font-bold">
                            {user.Session.DisplayName}
                        </div>
                        
                        <div className=" text-slate-300">
                            {user.Session.Role}
                        </div>
                    </div>
                </div>
                <PhosLink to="/author" icon="ph ph-cards" text="Dashboard" className="nav-link"/>
                <div className="flex flex-col">
                    <div className="text-slate-400 px-4">Blog</div>
                    <PhosLink to="/author/create" icon="ph ph-note-pencil" text="Create Post" className="nav-link"/>
                </div>
            </div>

            <div className="flex-[8.5] p-4">{ children }</div>
        </div>
    );
}