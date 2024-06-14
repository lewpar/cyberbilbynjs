'use client';

import { loginWithGithub, logout } from "@/lib/auth";
import Image from 'next/image';

export function GitHubLoginButton({ mode }: { mode: string }) {
    let githubIcon = "/images/github-mark.png";

    if(mode === "dark") {
        githubIcon = "/images/github-mark-white.png";
    }

    let onClick = async () => {
        await loginWithGithub();
    };

    return (
        <button onClick={onClick} className="flex flex-row gap-2 p-2 rounded-md items-center border text-white border-slate-800 bg-slate-900 text-sm">
            <Image 
                src={githubIcon}
                width={24} height={24}
                alt="GitHub Logo"
            />
            <div>Login with GitHub</div>
        </button>
    );
}

export function LogoutButton() {
    let onClick = async () => {
        await logout();
    };

    return (
        <button onClick={onClick} className="flex flex-row gap-2 p-2 rounded-md text-white hover:text-blue-500 transition items-center">
            <i className="ph ph-sign-out"></i>
            <div>Logout</div>
        </button>
    );
}