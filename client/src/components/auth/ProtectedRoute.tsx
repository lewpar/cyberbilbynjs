import { Navigate, useLocation } from "react-router-dom";
import { canAccessProtectedRoute } from "../../lib/auth";

export default function ProtectedRoute({ children }: { children: any }) {
    let route = useLocation().pathname;
    let isAuthorized = canAccessProtectedRoute(route);

    if(!isAuthorized) {
        return <Navigate to="/login"/>
    }

    return children;
}