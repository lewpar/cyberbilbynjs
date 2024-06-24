import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
        <form onSubmit={onSubmit} method="POST" className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="username">Username</label>
                <input name="username" type="text" className="border-2 ph-2"/>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" className="border-2 ph-2"/>
            </div>

            <button type="submit" className="border-2 p-2 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 transition">Login</button>

            { hasError ? <p className="text-red-500">{error}</p> : "" }
        </form>
    );
}