"use client";

import { SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useSession, signOut, signIn } from "next-auth/react";
import { getPlaylists } from "../lib/spotify-sdk/utils";
import { useState, useEffect } from 'react';
import Playlists from "../ui/Playlists";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

if (!clientId) {
    throw new Error('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is undefined');
}

//tambien me lo robe de spotifai
export default function Home() {
  const session = useSession();
  if (!session || session.status !== "authenticated") {
    return (
      <div className="mx-auto text-center bg-slate-900 max-w-lg rounded-lg p-4 mt-5">
        <h1 className="text-lg text-slate-100 font-semibold">Entra a tu cuenta de spotify para sortear tus pleilists</h1>
        <button className='bg-slate-400 font-semibold w-full p-1 hover:bg-slate-100 text-slate-900 text-lg rounded-md mt-4 mx-auto' onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    );
  }
  return (
    <div className="mx-auto bg-slate-900 max-w-5xl rounded-lg p-4 mt-5">
      <div className="text-center justify-center">
      <p className="text-lg text-slate-100 font-semibold">Logged in as {session.data.user?.name}</p>
      <button
      className='bg-slate-600 font-semibold w-80 p-1 hover:bg-green-100 text-slate-900 text-lg rounded-md mt-4 mx-auto mb-5' 
      onClick={() => signOut()}>
        Sign out
      </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Playlists sdk={sdk}/>
      </div>
    </div>
  );
}