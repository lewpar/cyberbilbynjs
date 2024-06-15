'use server';

import { signIn, signOut } from "@/auth";

export async function loginWithGithub(redirect?: string) {
    console.log(redirect);
    if(redirect) {
        await signIn("github", {
            redirectTo: redirect
        })
    }
    else
    {
        await signIn("github");
    }
}

export async function logout() {
    await signOut();
}