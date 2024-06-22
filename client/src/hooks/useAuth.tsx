import { useState } from "react";
import { clearSession, getUserAccess } from "../lib/auth";

const useAuth = () => {
    const [user, setUser] = useState(getUserAccess());

    const logout = () => {
        let user = getUserAccess();
        if(!user) {
            return;
        }

        clearSession();
        setUser(getUserAccess());
    };

    const login = () => {
        setUser(getUserAccess());
    };
    
    return [user, logout, login] as const;
}

export default useAuth;