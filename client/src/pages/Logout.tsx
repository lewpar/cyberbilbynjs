import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Logout() {
    let [loggedOut, setLoggedOut] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        auth.Logout();
        setLoggedOut(true);
    }, [setLoggedOut, auth]);

    return (
        <div>
        {
            loggedOut ?
            <Navigate to="/"/>
            :
            <div>Logging out..</div>
        }
        </div>
    );
}