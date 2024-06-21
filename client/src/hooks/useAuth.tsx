import { useState } from "react";
import { clearUserAccess, getUserAccess } from "../lib/auth";

const useAuth = () => {
    const [user, setUser] = useState(getUserAccess());

    const isLoggedIn = () => {
        let user = getUserAccess();
        if(!user) {
            return false;
        }

        return user.loggedIn;
    };

    const logout = () => {
        let user = getUserAccess();
        if(!user) {
            return;
        }

        clearUserAccess();
        setUser(getUserAccess());
    };

    const login = () => {
        setUser(getUserAccess);
    };
    
    return [user, isLoggedIn, logout, login] as const;
}

export default useAuth;