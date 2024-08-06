'use client';

import SearchUrl from "./SearchUrl";
import RefreshButton from "./RefreshButton";
import Playlists from "./Playlists";
import sdk from '@/app/lib/spotify-sdk/ClientInstance';

export default function PickPlaylists({path, title}: {path: string, title: string}) {
    return (
        <div className="mx-auto bg-black bg-opacity-70 max-w-7xl p-10 mt-5">
            <h1 className="text-center text-white text-lg my-4">{title}</h1>
            <div className="text-center">
                <SearchUrl path={path}/>
                <div className="flex justify-center items-center">
                    <h3 className="text-lg font-semibold text-slate-100 mb-6">O elegir playlist</h3>
                    <RefreshButton />
                </div>
            </div>
            <div className="justify-center grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-40">
                <Playlists sdk={sdk} path={path}/>
            </div>
        </div>
    );
}