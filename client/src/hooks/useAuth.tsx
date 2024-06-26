import { createContext, useContext, useEffect, useState } from "react";
import { ProtectedRoutes, loginUser, logoutUser, queryUser } from "../lib/auth";
import { BasicApiResponse } from "../lib/types/api-types";

export type UserSession = {
    Role: string;
    IsLoggedIn: boolean;
    DisplayName: string;
};

export type UserSessionHandler = {
    Session: UserSession;

    Login(username: string, password: string): Promise<BasicApiResponse>;
    Logout(): void;
    IsLoggedIn(): boolean;
    CanAccessProtectedRoute(route: string): boolean;

    IsInitializing(): boolean;
};

export const AuthContext = createContext<UserSessionHandler>({} as UserSessionHandler);

/**
 * The AuthProvider which wraps around your App. 
 * 
 * The purpose of this provider is to serve the user session to avoid props dependency chaining.
 */
export const AuthProvider = ({ children }: { children: any }) => {
    let provider = useAuthProvider();
    
    return (
        <AuthContext.Provider value={ provider }>
            {children}
        </AuthContext.Provider>
    );
};

function useAuthProvider(): UserSessionHandler {
    const [internalSession, setInternalSession] = useState<UserSession>({ Role: "Unauthenticated", IsLoggedIn: false } as UserSession);
    const [isInit, setIsInit] = useState(true);

    // If the user has a valid JWT then re-initiate the session.
    // This allows us to persist user sessions between refreshes.
    useEffect(() => {
        let fetchSession = async () => {
            let whoAmIResult = await queryUser();
            if(whoAmIResult.success) {
                let newSession = {
                    Role: whoAmIResult.role,
                    IsLoggedIn: true,
                    DisplayName: whoAmIResult.displayName
                } as UserSession;
        
                setInternalSession(newSession);
            }

            setIsInit(false);
        };

        fetchSession();
    }, [setInternalSession, setIsInit]);

    const isInitializing = (): boolean => {
        return isInit;
    };

    const login = async (username: string, password: string): Promise<BasicApiResponse> => {
        let loginResult = await loginUser(username, password);
        if(!loginResult.success) {
            return loginResult as BasicApiResponse;
        }

        let whoAmIResult = await queryUser();
        if(!whoAmIResult.success) {
            return { success: whoAmIResult.success, message: whoAmIResult.message } as BasicApiResponse;
        }

        let newSession = {
            Role: whoAmIResult.role,
            IsLoggedIn: whoAmIResult.isLoggedIn,
            DisplayName: whoAmIResult.displayName
        } as UserSession;

        setInternalSession(newSession);

        return { success: true, message: "Logged in." } as BasicApiResponse;
    };

    const logout = async (): Promise<BasicApiResponse> => {
        let logoutResult = await logoutUser();
        if(!logoutResult.success) {
            return logoutResult as BasicApiResponse;
        }

        let newSession = {
            Role: "Unauthenticated", 
            IsLoggedIn: false,
            DisplayName: "Anonymous"
        } as UserSession;

        setInternalSession(newSession);

        return { success: true, message: "Logged out." } as BasicApiResponse;
    };

    const isLoggedIn = (): boolean => {
        if(!internalSession) {
            return false;
        }

        return internalSession.IsLoggedIn;
    };

    const canAccessProtectedRoute = (route: string): boolean => {
        if(!internalSession.IsLoggedIn) {
            return false;
        }

        // If the path is /author/ then remove the trailing slash.
        if(route.endsWith('/')) {
            route = route.slice(0, route.length - 1);
        }

        console.log(internalSession);
        let result = ProtectedRoutes.some(pr => pr.route === route && pr.roles.includes(internalSession.Role.toLowerCase()));
        if(!result) {

            return false;
        }

        return true;
    };

    return { 
        Session: internalSession, 
        
        Login: login, 
        Logout: logout, 
        IsLoggedIn: isLoggedIn, 
        
        CanAccessProtectedRoute: canAccessProtectedRoute,
        IsInitializing: isInitializing
    } as UserSessionHandler;
}

/**
 * Returns the users current session which is stored in the AuthContext.
 */
export const useAuth = (): UserSessionHandler => {
    const auth = useContext(AuthContext);

    if(!auth) {
        throw new Error("Requested AuthContext outside of AuthProvider. Make sure you wrap your App in an AuthProvider to access this context.");
    }

    return auth;
};