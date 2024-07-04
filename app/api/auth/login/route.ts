import { NextRequest, NextResponse } from "next/server";
import { authenticate } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
    if (request.method !== 'POST'){
        return NextResponse.json({error: 'Method not allowed'}, {status: 405});
    }
    const body = await request.json();
    return authenticate(body);
}