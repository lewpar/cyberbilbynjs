import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { isSessionValid } from "@/auth";

import { LoginButton, LogoutButton } from "./components/auth/Buttons";
import SessionCard from "./components/auth/SessionCard";
import NavMenu from "./components/NavMenu";
import Logo from "./components/Logo";
import Socials from "./components/Socials";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberBilby",
  description: "Personal blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    let isLoggedIn = await isSessionValid();

    return (
        <html lang="en">
            <body className={inter.className}>
                <header className="items-center">
                    <Logo/>
                    <NavMenu/>
                </header>
                <main>
                {children}
                <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
                </main>
                <footer>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <div>CyberBilby &copy; 2024</div>
                        <Socials/>
                        {
                            isLoggedIn ? 
                            <div className="flex flex-row gap-4">
                                <SessionCard/>
                                <LogoutButton/>
                            </div> : 
                            <div>
                                <LoginButton/>
                            </div>
                        }
                    </div>
                </footer>
            </body>
        </html>
    );
}
