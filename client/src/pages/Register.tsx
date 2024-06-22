import { FormEvent, useState } from "react";
import { createUser } from "../lib/user";
import Layout from "../components/layout/Layout";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Register() {
    let [error, setError] = useState("");
    let [hasError, setHasError] = useState(false);

    let [hasSucceeded, setHasSucceeded] = useState(false);

    let [user, /*logout*/, /*login*/] = useAuth();

    if(user.isLoggedIn) {
        return <Navigate to="/"/>
    }

    let onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setHasError(false);
        setHasSucceeded(false);

        let formData = new FormData(event.currentTarget);

        let displayName = formData.get("display-name") as string;
        let username = formData.get("username") as string;
        let password = formData.get("password") as string;
        let confirmPassword = formData.get("confirm-password") as string;

        let result = await createUser(displayName, username, password, confirmPassword);

        if(!result.success) {
            setHasError(true);
            setError(result.message);
            return;
        }

        setHasSucceeded(true);
    };

    return (
        <Layout>
            <form onSubmit={onSubmit} method="POST" className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="display-name">Display Name</label>
                    <input name="display-name" type="text" className="border-2 ph-2"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" className="border-2 ph-2"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="border-2 ph-2"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input name="confirm-password" type="password" className="border-2 ph-2"/>
                </div>

                <button type="submit" className="border-2 p-2 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 transition">Create Account</button>

                { hasError ? <p className="text-red-500">{error}</p> : "" }
                { hasSucceeded ? <p className="text-green-500">Account created</p> : "" }
            </form>
        </Layout>
    );
}