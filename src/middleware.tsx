import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/api/blog/post",
    "/author",
    "/author/create",
    "/author/edit"
]

export async function middleware(request: NextRequest) {
    let pathName = request.nextUrl.pathname;

    if(!protectedRoutes.includes(pathName)) {
        return NextResponse.next();
    }


    // Send a GET request to an internal API to check the user is authorized to access protected resources.
    try {
        let session = request.cookies.get("authjs.session-token");
        if(!session) {
            // APIs should return a message instead of redirecting the user to login.
            if(pathName.startsWith("/api")) {
                return NextResponse.json({
                    message: "You are not authorized to access this resource."
                }, 
                { status: 401 });
            }
            else
            {
                return new NextResponse(null, {
                    status: 307,
                    headers: {
                        location: `${process.env.API_BASE_URL}/login?redirectTo=${pathName}`
                    }
                });
            }
        }

        // Forward the users session cookie to the authorize API to check the users roles.
        // This is done in the API because the middleware runs in the EDGE runtime which doesnt allow Prisma client.
        let result = await fetch(`${process.env.API_BASE_URL}/api/authorize`, {
            method: 'GET',
            headers: {
                Cookie: `${session.name}=${session.value}`
            }
        });

        // If the response from the API is not ok then the user is not authorized to access this resource.
        if(!result.ok) {
            return NextResponse.json({
                message: "An internal error occured while trying to access a protected resource."
            }, 
            { status: 401 });
        }
    }
    catch(error: any) {
        if(error instanceof TypeError) {
            let typeError = error as TypeError;
            console.log(`Fetch failed with error: ${typeError.cause}`);
        }
        return NextResponse.json({
            message: "An internal error occured when accessing this resource."
        }, 
        { status: 500 });
    }

    return NextResponse.next();
}