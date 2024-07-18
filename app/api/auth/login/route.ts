import { NextRequest, NextResponse } from "next/server";
import { authenticate } from '@/app/lib/auth';

//api para hacer login nose por que lo separe en otro archivo
export async function POST(request: NextRequest) {
    const body = await request.json();
    return authenticate(body);
}