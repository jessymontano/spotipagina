'use client';

import { updatePlaylist, getPlaylistInfo } from "@/app/lib/spotify-sdk/utils";
import { useSession } from "next-auth/react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    const session = useSession();
    const [order, setOrder] = useState(true);
    const searchParams = useSearchParams();
    const playlistId = searchParams.get('playlistId') ?? '';
    const [playlistName, setPlaylistName] = useState('Sin nombre');
    const [playlistImage, setPlaylistImage] = useState('/images/temp.png');
    const [status, setStatus] = useState(0);
    const [ isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        const fetchPlaylistInfo = async () => {
            const info = await getPlaylistInfo(sdk, playlistId);
        setPlaylistName(info.name);
        setPlaylistImage(info.imageUrl);
        }
        fetchPlaylistInfo();
    }, [playlistId]);

    const sortPlaylist = async () => {
        setIsSorting(true);
        await updatePlaylist(sdk, playlistId, order, setStatus);
        setIsSorting(false);
        setIsSorted(true);
    };

    if (!session || session.status !== "authenticated") {
        return (
            window.location.href = '/home'
        );
    }
    return (
        <div>
            {!isSorting && !isSorted && (
                <div className="bg-black bg-opacity-70 max-w-3xl p-1 md:p-5 m-6 mx-auto">
                    <h1 className="text-2xl text-white font-semibold mt-4 p-2 col text-center">Sortear playlist:</h1>
                    <div className="md:flex md:items-start">
                        <div className="mx-6 lg:mb-8 p-5 text-center">
                            <h2 className="text-lg text-center mb-2 text-white m-2 p-2">{playlistName}</h2>
                            <Image className="mx-auto" src={playlistImage} alt={playlistName} width={200} height={200}/>
                        </div>
                        <div className="mr-6 mb-8 p-5">
                    <label 
                    className="mb-6 mt-5 block text-lg font-medium text-white"
                    htmlFor="order"
                    >Elige el orden:</label>
                    <select
                    className="minecraft-btn text-md peer w-80 pl-10  mb-8 outline-2 placeholder:text-slate-300 mt-4 flex mx-auto justify-center text-white truncate p-2 border-2 border-b-4 hover:text-yellow-200" 
                    name="order" 
                    id="order"
                    onChange={(e) => setOrder(e.target.value === "true")}
                    >
                        <option value="true">Más nuevo a más viejo</option>
                        <option value="false">Más viejo a más nuevo</option>
                    </select>
                    <div className="text-center">
                    <button 
                    className="minecraft-btn mt-10 flex mx-auto w-80 md:w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200"
                    onClick={sortPlaylist}
                    >
                        Sortear playlist
                    </button>
                    </div>
                    </div>
                    </div>
                </div>
                )
            }
            {isSorting && (
                <div className="text-center m-6 p-6 text-white justify-center bg-black bg-opacity-70">
                    <h1 className="p-4 mb-8 text-lg">Acomodando playlist: {status}%</h1>
                <div className="overflow-hidden h-10 mb-10 text-xs flex bg-black border border-white ">
                    <div style={{width: `${status}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                </div>
                </div>
            )}
            {isSorted && (
                <div className="text-center mx-auto bg-black bg-opacity-70 max-w-3xl p-8 m-6">
                    <h3 className="text-2xl text-slate-100 font-bold m-4">Playlist acomodada exitosamente! uwu</h3>
                    <Link 
                    className="minecraft-btn mt-6 flex mx-auto w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200"
                    href="/home/playlists"
                    >Sortear otra playlist</Link>
                </div>
            )}
        </div>
    )
}