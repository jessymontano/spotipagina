import {cookies} from 'next/headers';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';
import Cryptr from 'cryptr';

if (!process.env.CRYPTR_SECRET) {
    throw new Error('CRYPTR_SECRET is undefined');
}
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const LoginSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

export async function authenticate(body: Promise<any>) {
    const parsedCredentials = LoginSchema.safeParse(body);
    if (!parsedCredentials.success) {
        return NextResponse.json({message: 'Invalid credentials'}, {status: 400});
    }

    const {username, password} = parsedCredentials.data;

    try {
        const result = await sql`SELECT * FROM users WHERE username=${username}`;
        const user = result.rows[0];
        if (!user) {
            return NextResponse.json({message: 'Invalid credentials'}, {status: 400});
        }

        const passwordsMatch = await argon2.verify(user.password, password);
        if (!passwordsMatch) {
            return NextResponse.json({message: 'Invalid credentials'}, {status: 400});
        }

        const sessionToken = cryptr.encrypt(user.id);
        const response = NextResponse.json({message: 'authenticated'}, {status: 200});
        cookies().set({
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