import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { createUser } from "../lib/auth";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
    let [error, setError] = useState("");
    let [hasError, setHasError] = useState(false);

    let [hasSucceeded, setHasSucceeded] = useState(false);

    const auth = useAuth();
    
    if(auth && auth.IsLoggedIn()) {
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
        <div className="flex flex-col gap-8 p-4">
            <div className="text-2xl">Register</div>

            <form onSubmit={onSubmit} method="POST" className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="display-name">Display Name</label>
                    <input name="display-name" type="text" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input name="confirm-password" type="password" className="nice-field"/>
                </div>

                <button type="submit" className="nice-button">Create Account</button>

                { hasError ? <p className="text-red-500">{error}</p> : "" }
                { hasSucceeded ? <p className="text-green-500">Account created</p> : "" }
            </form>
        </div>
    );
}