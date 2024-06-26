import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const auth = useAuth();

    let [error, setError] = useState("");
    let [hasError, setHasError] = useState(false);

    let navigate = useNavigate();

    let returnRoute: string = useLocation().state;

    if(auth && auth.IsLoggedIn()) {
        return <Navigate to="/"/>
    }

    let onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setHasError(false);

        let formData = new FormData(event.currentTarget);

        let username = formData.get("username") as string;
        let password = formData.get("password") as string;

        let result = await auth.Login(username, password);
        if(!result.success) {
            setError(result.message);
            setHasError(true);
            return;
        }

        navigate(returnRoute ?? "/");
    };

    return (
        <div className="flex flex-col gap-8 p-4">
            <div className="text-2xl">Login</div>

            <form onSubmit={onSubmit} method="POST" className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" className="nice-field"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="nice-field"/>
                </div>

                <button type="submit" className="nice-button">Login</button>
                <div>Don't have an account? <Link to="/register" className="text-blue-500">Register.</Link></div>

                { hasError ? <p className="text-red-500">{error}</p> : "" }
            </form>
        </div>
    );
}