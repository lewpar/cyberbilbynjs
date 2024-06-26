export type BasicApiResponse = {
    success: boolean;
    message: string;
};

export type WhoAmIResponse = {
    success: boolean;
    message: string;
    role: string;
    isLoggedIn: boolean;
    displayName: string;
};