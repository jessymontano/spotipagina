'use client';

import { getPlaylists } from "../lib/spotify-sdk/utils";
import { SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useState, useEffect} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Playlists({sdk}: {sdk: SpotifyApi}) {
    const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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

    const handleClick = (url: string) => {
        const params = new URLSearchParams(searchParams);
        url ? params.set('playlistUrl',url) : params.delete('playlistUrl');
        replace(`${pathname}/sort/?${params.toString()}`);
        console.log(url)
    }

    return (
        <>
        {playlists.map((playlist: SimplifiedPlaylist) => {
            return(
            <div 
            key={playlist.id} 
            className="rounded-xl bg-slate-700 p-2 shadow-sm text-center cursor-pointer"
            onClick={() => {
                handleClick(playlist.external_urls.spotify)
            }}
            >
                <div className="flex p-4">
                    {playlist.images ? 
                    <Image 
                    src={playlist.images[0].url} 
                    alt={playlist.description || playlist.name}
                    width={208}
                    height={208}
                    layout='responsive'
                    objectFit="cover"
                    className="max-h-52"
                    /> :
                    <p>0 imagen</p>}
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