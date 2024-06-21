import { Navigate } from "react-router-dom";
import { UserAccess, clearUserAccess } from "../lib/auth";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";

export default function Logout() {
    let [loggedOut, setLoggedOut] = useState(false);
    let [, setUser] = useAuth();

    useEffect(() => {
        clearUserAccess();
        setUser({ loggedIn: false } as UserAccess);
        setLoggedOut(true);
    }, [setUser]);

    return (
        <Layout>
            <div>
                {
                    loggedOut ?
                    <Navigate to="/"/>
                    :
                    <div>Logging out..</div>
                }
            </div>
        </Layout>
    );
}