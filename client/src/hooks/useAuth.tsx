import { useState } from "react";
import { getUserAccess } from "../lib/auth";

const useAuth = () => {
    const [user, setUser] = useState(getUserAccess());
    
    return [user, setUser] as const;
}

export default useAuth;