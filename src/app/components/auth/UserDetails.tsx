import { auth } from "@/auth";

export default async function UserDetails() {
    let session = await auth();
    
    return (
        <div className="flex flex-col p-4 m-2 rounded-sm">
            <div className="text-sm">{session?.user?.name}</div>
            <div className="text-xs">{session?.user?.email}</div>
        </div>
    );
}