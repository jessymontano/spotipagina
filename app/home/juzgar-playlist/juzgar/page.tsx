'use client';

import { getPlaylistTracks } from "@/app/lib/spotify-sdk/utils";
import { useEffect, useState } from "react";
import sdk from '@/app/lib/spotify-sdk/ClientInstance';
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { Track } from "@spotify/web-api-ts-sdk";
import { removeTrack } from "@/app/lib/spotify-sdk/utils";

export default function Page() {
    const session = useSession();
    const searchParams = useSearchParams();
    const playlistId = searchParams.get('playlistId') ?? '';
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlistTracks = await getPlaylistTracks(sdk, playlistId);
            setTracks(playlistTracks);
        }
        fetchPlaylists();
    }, [playlistId]);

    const handleDelete = async (trackUri: string) => {
        removeTrack(sdk, playlistId, trackUri);
        setTracks(prevTracks => prevTracks.filter(track => track.uri !== trackUri));
    }

    if (!session || session.status !== "authenticated") {
        return (
            window.location.href = '/home'
        );
    }

    return (
        <div className="mx-auto bg-black bg-opacity-70 max-w-7xl p-10 mt-5">
        {tracks.map((track) => {
            return (
                <div key={track.id} className="flex m-6 justify-center">
                    <iframe 
                        className="flex-1 max-w-6xl" 
                        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`} 
                        width='50%' 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                    ></iframe>
                    <button onClick={() => handleDelete(track.uri)} className="max-w-16 flex-1 ml-4 p-2 minecraft-btn justify-center text-white truncate border-2 border-b-4 hover:text-yellow-200">
                    <svg 
                    className="text-white"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"> <path d="M16 2v4h6v2h-2v14H4V8H2V6h6V2h8zm-2 2h-4v2h4V4zm0 4H6v12h12V8h-4zm-5 2h2v8H9v-8zm6 0h-2v8h2v-8z" fill="currentColor"/> </svg>
                    </button>
                </div>
            );
        })}
        </div>
    );
}