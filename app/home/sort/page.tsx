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
        await updatePlaylist(sdk, playlistId, order);
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
                <div className="bg-slate-800 max-w-3xl p-5 m-6 rounded-lg mx-auto">
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
                    className="peer block w-full rounded-md bg-slate-500 py-[9px] pl-10 text-sm outline-2 placeholder:text-slate-300 text-slate-100" 
                    name="order" 
                    id="order"
                    onChange={(e) => setOrder(e.target.value === "true")}
                    >
                        <option value="true">Más nuevo a más viejo</option>
                        <option value="false">Más viejo a más nuevo</option>
                    </select>
                    <div className="text-center">
                    <button 
                    className="bg-slate-500 text-slate-900 rounded-md hover:bg-slate-300 p-2 m-4"
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
                <p className="text-center font-extrabold text-2xl">Acomodando playlist...</p>
            )}
            {isSorted && (
                //TODO: hacer mas bonito
                <div className="text-center mx-auto bg-slate-800 max-w-3xl rounded-lg p-5 m-6">
                    <h3 className="text-2xl text-slate-100 font-bold m-4">Playlist acomodada exitosamente! uwu</h3>
                    <p className="text-lg text-slate-100 font-semibold m-4">listo fakiu</p>
                    <Link 
                    className="bg-slate-500 text-slate-900 rounded-md hover:bg-slate-300 p-2 m-4"
                    href="/home"
                    >Sortear otra playlist</Link>
                </div>
            )}
        </div>
    )
}