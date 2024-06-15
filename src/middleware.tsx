import { NextRequest, NextResponse } from "next/server";

const routes = [
    "/api/author", 
    "/author",
    "/author/create"
]

export async function middleware(request: NextRequest) {
    let pathName = request.nextUrl.pathname;

    if(!routes.includes(pathName)) {
        return NextResponse.next();
    }

    let result = await fetch(`${process.env.API_BASE_URL}/api/auth/current`, {
        method: 'GET',
        headers: request.headers,
    });

    if(!result.ok) {
        return new NextResponse(null, {
            status: 307,
            headers: {
                location: `${process.env.API_BASE_URL}/login?redirectTo=${pathName}`
            }
        })
    }

    return NextResponse.next();
}