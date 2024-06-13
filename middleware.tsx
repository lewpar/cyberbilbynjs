import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth';
 
export async function middleware(req: NextRequest) {
    let session = await auth();
    let path = req.nextUrl.basePath;

    if(path.startsWith('/blog/create')) {
        if(session == null) {
            return NextResponse.rewrite(new URL('/not-allowed', req.url), { status: 401 })
        }
    }

    return NextResponse.next()
}