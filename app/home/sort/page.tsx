'use client';

import { updatePlaylist } from "@/app/lib/spotify-sdk/utils";
import { useSession } from "next-auth/react";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import Link from "next/link";

export default function Page() {
    const session = useSession();
    const [order, setOrder] = useState(true);
    const searchParams = useSearchParams();
    const playlistId = searchParams.get('playlistId') ?? '';
    const [status, setStatus] = useState(0);
    const [ isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

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
                <div className="bg-black bg-opacity-70 max-w-3xl p-5 m-6 mx-auto">
                    <div className="text-center">
                        <h1 className="text-slate-100 text-2xl font-semibold m-4 p-2">Sortear pleilist</h1>
                        {/**TODO: poner titulo e imagen de playlist */}
                        <h2></h2>
                    </div>
                    <label 
                    className="mb-3 mt-5 block text-lg font-medium text-slate-100"
                    htmlFor="order"
                    >Elige el orden:</label>
                    <select
                    className="minecraft-btn text-md peer w-full bg-slate-500 py-[9px] pl-10 outline-2 placeholder:text-slate-300 mt-4 flex mx-auto justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200" 
                    name="order" 
                    id="order"
                    onChange={(e) => setOrder(e.target.value === "true")}
                    >
                        <option value="true">Más nuevo a más viejo</option>
                        <option value="false">Más viejo a más nuevo</option>
                    </select>
                    <div className="text-center">
                    <button 
                    className="minecraft-btn mt-6 flex mx-auto w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200"
                    onClick={sortPlaylist}
                    >
                        Sortear playlist
                    </button>
                    </div>
                </div>
                )
            }
            {isSorting && (
                //TODO: agregar progress bar
                <div className="text-center m-6 p-6 text-white justify-center bg-black bg-opacity-70">
                    <h1 className="p-4 mb-8 text-lg">Acomodando playlist: {status}%</h1>
                <div className="overflow-hidden h-10 mb-10 text-xs flex bg-black border border-white ">
                    <div style={{width: `${status}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                </div>
                </div>
            )}
            {isSorted && (
                //TODO: hacer mas bonito
                <div className="text-center mx-auto bg-black bg-opacity-70 max-w-3xl p-8 m-6">
                    <h3 className="text-2xl text-slate-100 font-bold m-4">Playlist acomodada exitosamente! uwu</h3>
                    <p className="text-lg text-slate-100 font-semibold m-4">listo fakiu</p>
                    <Link 
                    className="minecraft-btn mt-6 flex mx-auto w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200"
                    href="/home"
                    >Sortear otra playlist</Link>
                </div>
            )}
        </div>
    )
}