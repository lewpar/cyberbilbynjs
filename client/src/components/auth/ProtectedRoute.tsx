import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: any }) {
    let [user, /*logout*/, /*login*/] = useAuth();

    let route = useLocation().pathname;
    let isAuthorized = user.canAccessProtectedRoute(route);

    if(!isAuthorized && !user.isLoggedIn) {
        return <Navigate to="/login" state={ route /* Return Route */ }/>
    }

    if(!isAuthorized && user.isLoggedIn) {
        console.log(user);
        return <Navigate to="/forbidden"/>
    }

    return children;
}