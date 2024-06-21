import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";

export default function Logout() {
    let [loggedOut, setLoggedOut] = useState(false);
    let [,,logout] = useAuth();

    useEffect(() => {
        logout();
        setLoggedOut(true);
    }, [logout]);

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