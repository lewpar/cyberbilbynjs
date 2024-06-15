"use client";

import { useState } from "react";
import ActionButton from "./ActionButton";
import ActionHeader from "./ActionHeader";

export default function Actions() {
    let [ isCollapsed, setIsCollapsed ] = useState(true);

    function toggleMobileMenu() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className={`flex flex-col ${isCollapsed ? "" : "pb-4"} tablet:pb-4`}>
            <button onClick={toggleMobileMenu} className="text-white p-2 text-3xl tablet:hidden">
                <i className="ph ph-list"></i>
            </button>
            <div className={`${isCollapsed ? "hidden collapse" : "block visible"} tablet:block tablet:visible self-stretch`}>
                <ActionButton href="/author" text="Dashboard" icon="ph ph-browsers"/>
                <ActionHeader text="Blog"/>
                <ActionButton href="/author/create" text="Create Post" icon="ph ph-note-pencil"/>
            </div>
        </div>
    );
}