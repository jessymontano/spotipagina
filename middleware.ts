'use server';

import {NextRequest, NextResponse} from 'next/server';

const hostname = process.env.HOSTNAME;

//cosa horrible que se encarga permitir o prohibir acceso a ciertas paginas...
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value; //token del cookie

    try {
        if (token) {
            //llamar api porqe el edge inutil no sabe hacer nada
            const loggedIn = await fetch(`${hostname}/api/verify-token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token}),
            });
            //muchos redirects
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

//esto es para qe no haga nada el middleware si estas en estas paginas (api, imagenes, etc lugares random)
export const config = {
    matcher: ['/((?!api|_next/static|seed|error|_next/image|.*\\.png$).*)'],
}