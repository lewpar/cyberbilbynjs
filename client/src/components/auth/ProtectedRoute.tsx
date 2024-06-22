import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: any }) {
    let [user] = useAuth();

    let route = useLocation().pathname;
    let isAuthorized = user.canAccessProtectedRoute(route);

    if(!isAuthorized && !user.loggedIn) {
        return <Navigate to="/login" state={ route /* Return Route */ }/>
    }

    if(!isAuthorized && user.loggedIn) {
        return <Navigate to="/forbidden"/>
    }

    return children;
}