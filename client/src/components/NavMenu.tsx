import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavMenu() {
    const auth = useAuth();

    return (
        <div>
            <ul>
                <li className="flex flex-row gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/blog">Blog</Link>

                    {
                        !auth?.IsLoggedIn() ?
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </> 
                        : ""
                    }

                    {
                        auth?.IsLoggedIn() ?
                        <>
                            <Link to="/logout">Logout</Link>
                        </>
                        : ""
                    }

                    { 
                        auth?.CanAccessProtectedRoute("/author") ?  
                        <Link to="/author">Author</Link>
                        : ""
                    }
                </li>
            </ul>
        </div>
    );
}