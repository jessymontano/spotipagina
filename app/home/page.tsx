"use client";

import { SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk";
import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from 'react';

//tambien me lo robe de spotifai
export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    return (
      <div>
        <h1>Entra a tu cuenta de spotify para sortear tus pleilists</h1>
        <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as {session.data.user?.name}</p>
      <p>{session.data.user?.email}</p>
      {}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
