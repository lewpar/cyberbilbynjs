import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: any }) {
    return (
        <div className="h-full flex flex-row">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <main className="flex-1 flex flex-col bg-stone-950 text-white">
                    {children}
                </main>
                <Footer/>
            </div>
            
        </div>
    );
}