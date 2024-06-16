import { NextRequest } from "next/server";

export class Authorization {
    static protectedRoutes = [
        "/api/blog/post",
        "/author",
        "/author/create",
        "/author/edit"
    ]

    public static isRouteProtected(route: string): boolean {
        return this.protectedRoutes.includes(route);
    }

    public static async isAuthorized(request: NextRequest): Promise<boolean> {
        try {
            let session = request.cookies.get("authjs.session-token");
            if(!session) {
                return false;
            }

            let result = await fetch(`${process.env.WEBSITE_URL}/api/authorize`, {
                method: 'GET',
                headers: {
                    Cookie: `${session.name}=${session.value}`
                }
            });

            if(!result.ok) {
                return false;
            }
        }
        catch(error: any) {
            if(error instanceof TypeError) {
                let typeError = error as TypeError;
                console.log(`Fetch failed with error: ${typeError.cause}`);
            }
            
            return false;
        }

        return true;
    }
}