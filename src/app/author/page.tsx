import AdminActions from "../components/auth/AdminActions";

export default function Page() {
    return (
        <div className="flex flex-row p-4">
            <AdminActions/>
            <div className="flex-1 p-4">
                Some stuff
            </div>
        </div>
    );
}