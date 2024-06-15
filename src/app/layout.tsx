import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { isSessionValid } from "@/auth";

import SessionCard from "./components/auth/SessionCard";
import NavMenu from "./components/NavMenu";
import Logo from "./components/Logo";
import Socials from "./components/Socials";
import { GitHubLoginButton, LogoutButton } from "./components/auth/Buttons";
import { isAuthorizedAuthor } from "@/lib/blog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberBilby",
  description: "Personal blog",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-900`}>
                <header className="flex flex-row bg-slate-900 gap-0">
                    <Logo width={40} height={40}/>
                    <NavMenu isLoggedIn={await isSessionValid()}/>
                </header>
                <main className="bg-slate-100">
                    {children}
                    <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
                </main>
                <footer className="bg-slate-900">
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <div>CyberBilby &copy; 2024</div>
                        <Socials/>
                    </div>
                </footer>
            </body>
        </html>
    );
}
