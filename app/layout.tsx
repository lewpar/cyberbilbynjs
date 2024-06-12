import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberBilby",
  description: "Personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                    <a href="/"><li>Home</li></a>
                    <a href="/blog"><li>Blog</li></a>
                </ul>
            </header>
            <main>
            {children}
            </main>
            <footer>
                CyberBilby &copy; 2024
            </footer>
        </body>
    </html>
  );
}
