import { Navigate, useLocation } from "react-router-dom";
import { canAccessProtectedRoute } from "../../lib/auth";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: any }) {
    let [user] = useAuth();

    let route = useLocation().pathname;
    let isAuthorized = canAccessProtectedRoute(route);

    if(!isAuthorized && !user.loggedIn) {
        return <Navigate to="/login"/>
    }

    if(!isAuthorized && user.loggedIn) {
        return <Navigate to="/forbidden"/>
    }

    return children;
}