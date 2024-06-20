import { BasicApiResponse } from "./types/api-types";

export async function createUser(displayName: string, username: string, password: string, confirmPassword: string): Promise<BasicApiResponse> {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, { 
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
            console.log(`Failed to fetch blog posts with API error: ${response.status} : ${response.statusText}`)
            return await response.json() as BasicApiResponse;
        }

        return { success: true, message: "Account created" } as BasicApiResponse;
    }
    catch(error) {
        console.log(`Failed to fetch blog posts with error: ${error}`)
        return { success: false, message: "Internal error occured" } as BasicApiResponse;
    }
}