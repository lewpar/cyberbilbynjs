import { useState } from "react";
import { clearSession, getUserAccess } from "../lib/auth";

const useAuth = () => {
    const [user, setUser] = useState(getUserAccess());

    const logout = () => {
        let user = getUserAccess();
        console.log("logout1");
        if(!user) {
            return;
        }
        console.log("logout2");
        clearSession();
        setUser(getUserAccess());
    };

    const login = () => {
        setUser(getUserAccess());
    };
    
    return [user, logout, login] as const;
}

export default useAuth;