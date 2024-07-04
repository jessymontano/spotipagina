'use server';

import {NextRequest, NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    try {
        if (token) {
            const loggedIn = await fetch('http://localhost:3000/api/verify-token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token}),
            });
            console.log(loggedIn);
            if (loggedIn.ok && request.nextUrl.pathname.startsWith('/login')) {
                
                return NextResponse.redirect(new URL('/home', request.url));
            } else if (!loggedIn.ok && !request.nextUrl.pathname.startsWith('/login')) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } else {
            if (!request.nextUrl.pathname.startsWith('/login')) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/error', request.url));        
    }
} 

export const config = {
    matcher: ['/((?!api|_next/static|seed|error|_next/image|.*\\.png$).*)'],
}