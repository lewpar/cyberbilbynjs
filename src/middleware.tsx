import { NextRequest, NextResponse } from "next/server";

const routes = [
    "/api/blog/post",
    "/author",
    "/author/create",
    "/author/edit"
]

export async function middleware(request: NextRequest) {
    let pathName = request.nextUrl.pathname;

    if(!routes.includes(pathName)) {
        return NextResponse.next();
    }

    try {
        let session = request.cookies.get("authjs.session-token");
        if(!session) {
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

        let result = await fetch(`${process.env.API_BASE_URL}/api/auth/current`, {
            method: 'GET',
            headers: {
                Cookie: `${session.name}=${session.value}`
            }
        });

        if(!result.ok) {
            return NextResponse.json({
                message: "You are not authorized to access this resource."
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