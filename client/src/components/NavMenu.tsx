import useAuth from "../hooks/useAuth";
import PhosLink from "./PhosLink";

export default function NavMenu() {
    let [user] = useAuth();
    
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
                        !user?.loggedIn ?
                        <PhosLink
                            href="/register"
                            icon="ph ph-user-add"
                            text="Register"
                        /> : ""
                    }


                    {
                        !user?.loggedIn ?
                        <PhosLink
                            href="/login"
                            icon="ph ph-user"
                            text="Login"
                        />
                        :
                        <PhosLink
                            href="/logout"
                            icon="ph ph-user"
                            text="Logout"
                        />
                    }

                    { 
                        user?.canAccessProtectedRoute("/test") ?  
                        <PhosLink
                            href="/test"
                            icon="ph ph-user"
                            text="Test"
                        />
                        : ""
                    }
                </li>
            </ul>
        </div>
    );
}