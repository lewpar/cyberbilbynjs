import { auth } from "@/auth";

export default async function SessionCard() {
    let session = await auth();

    if(session == null) {
        return <div>Not logged in.</div>
    }

    return (
        <div>{session.user?.name}</div>
    );
}