import { useAuth } from "../hooks/useAuth";
import PhosLink from "./PhosLink";

export default function NavMenu() {
    const auth = useAuth();

    return (
        <div>
            <ul>
                <li className="flex flex-row gap-4">
                    <PhosLink
                        href="/"
                        icon="ph ph-house"
                        text="Home"
                    />

                    <PhosLink
                        href="/blog"
                        icon="ph ph-house"
                        text="Blog"
                    />

                    {
                        auth?.IsLoggedIn() ?
                        <div>Test</div> : ""
                    }

                    {
                        !auth?.IsLoggedIn() ?
                        <>
                            <PhosLink
                                href="/register"
                                icon="ph ph-user-add"
                                text="Register"
                            />
                            <PhosLink
                                href="/login"
                                icon="ph ph-user"
                                text="Login"
                            />
                        </> 
                        : ""
                    }

                    {
                        auth?.IsLoggedIn() ?
                        <>
                            <PhosLink
                                href="/logout"
                                icon="ph ph-user"
                                text="Logout"
                            />
                        </>
                        : ""
                    }

                    { 
                        auth?.CanAccessProtectedRoute("/author") ?  
                        <PhosLink
                            href="/author"
                            icon="ph ph-user"
                            text="Author"
                        />
                        : ""
                    }
                </li>
            </ul>
        </div>
    );
}