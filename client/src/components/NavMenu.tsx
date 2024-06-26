import "./NavMenu.tsx.css"

import { useAuth } from "../hooks/useAuth";
import PhosLink from "./PhosLink";
import { useLocation } from "react-router-dom";

export default function NavMenu() {
    const auth = useAuth();
    const path = useLocation().pathname.toLowerCase();

    return (
        <ul className="w-full">
            <li className="flex flex-col gap-2">
                <PhosLink to="/" icon="ph ph-house" text="Home" className={path === "/" ? "n-nav-link-current" : "n-nav-link"}/>
                <PhosLink to="/blog" icon="ph ph-newspaper" text="Blog" className={path.startsWith("/blog") ? "n-nav-link-current" : "n-nav-link"}/>

                {
                    !auth?.IsLoggedIn() ?
                    <>
                        <PhosLink to="/register" icon="ph ph-user-plus" text="Register" className={path.startsWith("/register") ? "n-nav-link-current" : "n-nav-link"}/>
                        <PhosLink to="/login" icon="ph ph-sign-in" text="Login" className={path.startsWith("/login") ? "n-nav-link-current" : "n-nav-link"}/>
                    </> 
                    : ""
                }

                {
                    auth?.IsLoggedIn() ?
                    <>
                        <PhosLink to="/logout" icon="ph ph-sign-out" text="Logout" className={path.startsWith("/logout") ? "n-nav-link-current" : "n-nav-link"}/>
                    </>
                    : ""
                }

                { 
                    auth?.CanAccessProtectedRoute("/author") ?  
                    <PhosLink to="/author" icon="ph ph-code-block" text="Author" className={path.startsWith("/author") ? "n-nav-link-current" : "n-nav-link"}/>
                    : ""
                }
            </li>
        </ul>
    );
}