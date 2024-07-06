"use client";

import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useSession, signIn } from "next-auth/react";
import Playlists from "@/app/ui/Playlists";
import SearchUrl from "@/app/ui/SearchUrl";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

if (!clientId) {
    throw new Error('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is undefined');
}

//tambien me lo robe de spotifai
export default function Page() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    return (
      <div className="mx-auto text-center bg-black bg-opacity-50 max-w-3xl p-4 mt-10">
        <h1 className="text-lg text-slate-100 font-semibold">Entra a tu cuenta de spotify para sortear tus pleilists</h1>
        <button className='minecraft-btn mt-4 flex mx-auto w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    );
  }
  return (
    <div className="mx-auto bg-black bg-opacity-70 max-w-7xl p-10 mt-5">
      <div className="text-center">
      <SearchUrl />
        <h3 className="text-lg font-semibold text-slate-100 mb-6">O elegir playlist</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-40">
        <Playlists sdk={sdk}/>
      </div>
    </div>
  );
}