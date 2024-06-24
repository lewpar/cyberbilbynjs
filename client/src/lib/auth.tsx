import { BasicApiResponse, WhoAmIResponse } from "./types/api-types";

type ProtectedRoute = {
    route: string;
    roles: string[];
}

export const ProtectedRoutes: ProtectedRoute[] = [
    {
        route: "/author",
        roles: [ "author", "administrator" ]
    },
    {
        route: "/author/create",
        roles: [ "author", "administrator" ]
    }
];

export async function createUser(displayName: string, username: string, password: string, confirmPassword: string): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/account/create`, { 
            mode:"cors",
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                DisplayName: displayName,
                Username: username,
                Password: password,
                ConfirmPassword: confirmPassword
            })
        });

        if(!response.ok) {
            console.log(`Failed to fetch account create API with error: ${response.status} : ${response.statusText}`);
            return await response.json() as BasicApiResponse;
        }

        return { success: true, message: "Account created" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to fetch account create with error: ${error}`);
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}

export async function loginUser(username: string, password: string): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/account/login`, { 
            mode:"cors",
            method: "POST",
            credentials: "include", // Must be included to receive the Http-Only cookie provided by Set-Cookie header
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        });

        if(!response.ok) {
            console.log(`Failed to fetch account login API with error: ${response.status} : ${response.statusText}`);
            return await response.json() as BasicApiResponse;
        }

        return { success: true, message: "Logged in" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to fetch login with error: ${error}`);
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}

export async function logoutUser(): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/account/logout`, { 
            mode:"cors",
            method: "GET",
            credentials: "include", // Must be included to receive the Http-Only cookie provided by Set-Cookie header
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" 
            }
        });

        if(!response.ok) {
            console.log(`Failed to fetch account logout API with error: ${response.status} : ${response.statusText}`);
            return await response.json() as BasicApiResponse;
        }

        return { success: true, message: "Logged out" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to fetch logout with error: ${error}`);
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}

export async function queryUser(): Promise<WhoAmIResponse> {
    try {
        let whoAmIResponse = await fetch(`${process.env.REACT_APP_API_URL}/account/whoami`, { 
            mode:"cors",
            method: "GET",
            credentials: "include", // Must be included to save the Http-Only cookie provided by Set-Cookie header
            headers: {
                "Accept": "application/json"
            }
        });
    
        if(!whoAmIResponse.ok) {
            console.log(`Failed to fetch account whoami API with error: ${whoAmIResponse.status} : ${whoAmIResponse.statusText}`);
            return await whoAmIResponse.json() as WhoAmIResponse;
        }

        let body = await whoAmIResponse.json();

        return body as WhoAmIResponse;
    }
    catch(error) {
        console.log(`Failed to fetch whoami with error: ${error}`);
        return { success: false, message: "Internal error occured" } as WhoAmIResponse;
    }
}