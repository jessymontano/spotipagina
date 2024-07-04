'use client';

import { getPlaylists } from "../lib/spotify-sdk/utils";
import { SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState, useEffect} from "react";

export default function Playlists({sdk}: {sdk: SpotifyApi}) {
    const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const fetchedPlaylists = await getPlaylists(sdk);
                setPlaylists(fetchedPlaylists);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPlaylists();
    }, [sdk]);

    return (
        <>
        {playlists.map((playlist: SimplifiedPlaylist) => {
            return(
            <div key={playlist.id} className="rounded-xl bg-slate-700 p-2 shadow-sm text-center">
                <div className="flex p-4">
                    <Image 
                    src={playlist.images[0].url} 
                    alt={playlist.description || playlist.name}
                    width={200}
                    height={200}
                    layout='responsive'
                    objectFit="cover"
                    className="w-[200px] h-[200px]"
                    />
                </div>
                <div>
                    <h3 className="ml-2 text-sm font-medium text-white">{playlist.name}</h3>
                </div>
            </div>
            );
        })}
        </>
    );
}