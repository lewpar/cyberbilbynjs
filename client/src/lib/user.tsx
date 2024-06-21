import { BasicApiResponse } from "./types/api-types";

export async function createUser(displayName: string, username: string, password: string, confirmPassword: string): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/account/create`, { 
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
            console.log(`Failed to fetch account create API with error: ${response.status} : ${response.statusText}`)
            return await response.json() as BasicApiResponse;
        }

        return { success: true, message: "Account created" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to fetch account create with error: ${error}`)
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}

export async function loginUser(username: string, password: string): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/account/login`, { 
            mode:"cors",
            method: "POST",
            credentials: "include",
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
            console.log(`Failed to fetch account login API with error: ${response.status} : ${response.statusText}`)
            return await response.json() as BasicApiResponse;
        }

        let response2 = await fetch(`${process.env.REACT_APP_API_URL}/api/account/test`, { 
            mode:"cors",
            method: "GET",
            credentials: "include"
        });

        if(!response2.ok) {
            console.log(`Failed test with error: ${response2.status} : ${response2.statusText}`);
        }

        return { success: true, message: "Account logged in" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to fetch login with error: ${error}`)
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}