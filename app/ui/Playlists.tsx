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

    const handleClick = (id: string) => {
        const params = new URLSearchParams(searchParams);
        id ? params.set('playlistId',id) : params.delete('playlistId');
        replace(`${pathname}/sort/?${params.toString()}`);
        console.log(id)
    }

    return (
        <>
        {playlists.map((playlist: SimplifiedPlaylist) => {
            return(
            <div 
            key={playlist.id} 
            className="minecraft-btn border-2 border-b-4 hover:text-yellow-200 p-2 shadow-sm text-center cursor-pointer"
            onClick={() => {
                handleClick(playlist.external_urls.spotify.split('/playlist/')[1])
            }}
            >
                <div className="flex p-4">
                    {<Image 
                    src={playlist.images ? playlist.images[0].url : '/images/temp.png'} 
                    alt={playlist.description || playlist.name}
                    width={200}
                    height={200}
                    className="aspect-square cover"
                    />}
                </div>
                <div>
                    <h3 className="ml-2 text-sm font-medium text-white pb-4">{playlist.name}</h3>
                </div>
            </div>
            );
        })}
        </>
    );
}