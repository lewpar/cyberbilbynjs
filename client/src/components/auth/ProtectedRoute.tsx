import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: any }) {
    const route = useLocation().pathname;
    const auth = useAuth();

    if(auth.IsInitializing()) {
        return <div>Loading..</div>
    }

    if(!auth || !auth.IsLoggedIn()) {
        return <Navigate to="/login" state={ route /* Return Route */ }/>
    }

    let isAuthorized = auth.CanAccessProtectedRoute(route);
    if(!isAuthorized) {
        return <Navigate to="/forbidden"/>
    }

    return children;
}