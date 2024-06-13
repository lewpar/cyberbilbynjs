'use client';

import { signIn, signOut } from "next-auth/react";
import { FormEvent } from "react";

async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await signIn();
}

async function logout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await signOut();
}

export function LoginButton() {
    return (
        <form onSubmit={login}>
            <button type="submit" className="flex flex-row gap-2 p-2 border-2 rounded-md items-center justify-center bg-white text-black">
                <i className="ph ph-sign-in"></i>
                <div>Login</div>
            </button>
        </form>
    );
}

export function LogoutButton() {
    return (
        <form onSubmit={logout}>
            <button type="submit" className="flex flex-row gap-2 p-2 border-2 rounded-md items-center justify-center bg-white text-black">
                <i className="ph ph-sign-out"></i>
                <div>Logout</div>
            </button>
        </form>
    );
}