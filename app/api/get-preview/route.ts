'use server';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const spotifyTrackId = body.trackId;

    try {
        const embedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}`;
        const response = await fetch(embedUrl);
        const html = await response.text();
    
        const matches = html.match(/"audioPreview":\s*{\s*"url":\s*"([^"]+)"/);
        if (matches) {
            return NextResponse.json({previewUrl: matches[1]}, {status: 200})
        } else {
            return NextResponse.json({error: "Preview not found"}, {status: 500});
        }
      } catch (error) {
        console.error("Failed to fetch Spotify preview URL:", error);
        return NextResponse.json({error: error}, {status: 500});
      }
}