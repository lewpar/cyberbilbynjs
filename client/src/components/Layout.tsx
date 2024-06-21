import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Layout({ children }: { children: any }) {
    return <>
        <Header/>
        <main className="flex-1 flex flex-col">
            {children}
        </main>
        <Footer/>
    </>
}