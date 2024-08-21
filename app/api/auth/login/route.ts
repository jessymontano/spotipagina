import { NextRequest, NextResponse } from "next/server";
import { authenticate } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
    const body = await request.json();
    return authenticate(body);
}