import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image'
import { auth } from "@/auth";

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

    let session = await auth();
    
    return (
        <html lang="en">
            <body className={inter.className}>
                <header className="items-center">
                    <a href="/" className="flex flex-col gap-1 items-center">
                        <Image 
                            src="/images/bilby.png" 
                            width={128} height={128} 
                            alt="CyberBilby Logo"
                        />
                        <span className="text-xl">Cyber Bilby</span>
                    </a>
                    <ul>
                        <a href="/" className="flex flex-row gap-1 items-center justify-center"><i className="ph ph-house"></i><li>Home</li></a>
                        <a href="/blog" className="flex flex-row gap-1 items-center justify-center"><i className="ph ph-newspaper"></i><li>Blog</li></a>
                    </ul>
                    {
                        session != null ? 
                        <div className="flex flex-row gap-4">
                            {session.user?.name}
                            <a href="/logout">Logout</a>
                        </div> : 
                        <div>
                            <a href="/login">Login</a>
                        </div>
                    }
                </header>
                <main>
                {children}
                <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
                </main>
                <footer>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <div>CyberBilby &copy; 2024</div>
                        <a href="https://github.com/lewpar/" className="flex flex-row gap-1 bg-white p-1 rounded-3xl">
                            <Image 
                                src="/images/github-mark.png" 
                                width={20} height={20} 
                                alt="GitHub Profile"
                            />
                        </a>
                    </div>
                </footer>
            </body>
        </html>
    );
}
