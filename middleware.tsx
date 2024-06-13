import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(req: NextRequest) {
    let path = req.nextUrl.pathname;

    if(path.startsWith('/blog/create')) {
        return NextResponse.rewrite(new URL('/not-allowed', req.url), { status: 401 })
    }

    return NextResponse.next()
}