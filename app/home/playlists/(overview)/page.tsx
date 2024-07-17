"use client";

import { useSession, signIn } from "next-auth/react";
import PickPlaylists from "@/app/ui/PickPlaylist";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

if (!clientId) {
    throw new Error('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is undefined');
}

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
  return <PickPlaylists path="sort" title="Elige 1 playlist para acomodar"/>;
}