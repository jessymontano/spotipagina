import Cryptr from 'cryptr';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

if (!process.env.CRYPTR_SECRET) {
    throw new Error('CRYPTR_SECRET is undefined');
}
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return NextResponse.json({error: 'Method not allowed'}, {status: 405});
    }
    const body = await request.json();
    const token = body.token;
    if (token) {
        const decriptedToken = cryptr.decrypt(token);
        try {
            const result = await sql`SELECT * FROM users WHERE id=${decriptedToken}`;
            const user = result.rows[0];
            if (!user) {
                return NextResponse.json({error: 'Incorrect token'}, {status:400});
            }
            return NextResponse.json({message: 'Token verified'}, {status: 200});
        } catch (error) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    } else return NextResponse.json({error: 'Incorrect token'}, {status:400});
}