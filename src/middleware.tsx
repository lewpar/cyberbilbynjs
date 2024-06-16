import { NextRequest, NextResponse } from "next/server";
import { Authorization } from "./lib/Authorization";

export async function middleware(request: NextRequest) {
    let route = request.nextUrl.pathname;

    if(!Authorization.isRouteProtected(route)) {
        return NextResponse.next();
    }

    if(!await Authorization.isAuthorized(request)) {
        if(route.startsWith("/api")) {
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
                    location: `${process.env.SITE_URL}/login?redirectTo=${route}`
                }
            });
        }
    }

    return NextResponse.next();
}