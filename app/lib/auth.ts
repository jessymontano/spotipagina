import {cookies} from 'next/headers';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';
import Cryptr from 'cryptr';

//aqi checa si si pusiste bien usuario y contraseña uwu
if (!process.env.CRYPTR_SECRET) {
    throw new Error('CRYPTR_SECRET is undefined');
}
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const LoginSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

//la funcion qe deberia estar en el api pero no se porque la movi aqi
export async function authenticate(body: Promise<any>) {
    const parsedCredentials = LoginSchema.safeParse(body);
    if (!parsedCredentials.success) { //si esta mal escrito 🤔
        return NextResponse.json({message: 'Invalid credentials'}, {status: 400});
    }

    const {username, password} = parsedCredentials.data;

    try {
        const result = await sql`SELECT * FROM users WHERE username=${username}`;
        const user = result.rows[0];
        if (!user) { //si no existe el usuario en la base de datos
            return NextResponse.json({message: 'Invalid credentials'}, {status: 400});
        }

        const passwordsMatch = await argon2.verify(user.password, password);
        if (!passwordsMatch) { //si la contraseña esta mal
            return NextResponse.json({message: 'Invalid credentials'}, {status: 400});
        }

        const sessionToken = cryptr.encrypt(user.id);
        const response = NextResponse.json({message: 'authenticated'}, {status: 200});
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'token',
            value: sessionToken,
            httpOnly: true,
            path: '/',
            maxAge: 3600,
            sameSite: 'lax'
        });
        return response;
    } catch (error) {
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}