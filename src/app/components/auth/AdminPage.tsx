import ActionSidebar from "./AdminSidebar/ActionSidebar";

export default function AdminPage({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex-1 flex flex-col tablet:flex-row">
            <ActionSidebar/>
            <div className="flex-1 p-4">
                {children}
            </div>
        </div>
    );
}