'use client';

import { getPlaylistTracks } from "@/app/lib/spotify-sdk/utils";
import { useEffect, useState } from "react";
import sdk from '@/app/lib/spotify-sdk/ClientInstance';
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { Track } from "@spotify/web-api-ts-sdk";
import { removeTrack } from "@/app/lib/spotify-sdk/utils";
import SongPreview from "@/app/ui/SongPreview";
import Link from "next/link";

export default function Page() {
    const session = useSession();
    const searchParams = useSearchParams();
    const playlistId = searchParams.get('playlistId') ?? '';
    const [tracks, setTracks] = useState<Track[]>([]);
    const [index, setIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlistTracks = await getPlaylistTracks(sdk, playlistId);
            setTracks(playlistTracks);
        }
        fetchPlaylists();
    }, [playlistId]);

    const handleDelete = async (trackUri: string) => {
        removeTrack(sdk, playlistId, trackUri);
        setTracks(prevTracks => {
            const updatedTracks = prevTracks.filter(track => track.uri !== trackUri);
            if (index >= updatedTracks.length) {
                setIndex(updatedTracks.length - 1);
            }
            return updatedTracks;
        });
    }

    const handleSwipeLeft = (trackUri: string) => {
        console.log('eliminado');
        handleDelete(trackUri);
        if (index < tracks.length - 1) {
            setIndex(index);
        } else {
            console.log("fin de la pleilis");
            setFinished(true);
        }
    }

    const handleSwipeRight = () => {
        console.log('no eliminado uwu');
        if (index < tracks.length - 1) {
            setIndex(index + 1);
        } else {
            console.log("fin de la pleilis");
            setFinished(true);
        }
    }

    if (!session || session.status !== "authenticated") {
        return (
            window.location.href = '/home'
        );
    }

    return (
            <>
            {!finished && tracks.length > 0 && (
                <div className="flex m-6 justify-center">
                    <SongPreview track={tracks[index]} onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />
                </div>
            )}
            {finished && (
                <div>
                    <h1>Fin de la pleilis</h1>
                    <Link href='/home/juzgar'>Juzgar otra pleilis</Link>
                </div>
            )}
            </>
    );
}