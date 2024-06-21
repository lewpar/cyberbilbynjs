import { canAccessProtectedRoute, isLoggedIn } from "../lib/auth";
import PhosLink from "./PhosLink";

export default function NavMenu() {
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
                        !isLoggedIn() ?
                        <PhosLink
                            href="/register"
                            icon="ph ph-user-add"
                            text="Register"
                        /> : ""
                    }


                    {
                        !isLoggedIn() ?
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
                        canAccessProtectedRoute("/test") ?  
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