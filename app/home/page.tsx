'use client';

import { useSession, signIn } from "next-auth/react"
import Link from "next/link";

export default function Home() {
    const session = useSession();
    if (!session || session.status !== "authenticated") {
        return (
          <div className="mx-auto text-center bg-black bg-opacity-50 max-w-3xl p-4 mt-10">
            <h1 className="text-lg text-slate-100 font-semibold">Entra a tu cuenta de spotify para sortear tus playlists</h1>
            <button className='minecraft-btn mt-4 flex mx-auto w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' onClick={() => signIn("spotify")}>Sign in with Spotify</button>
          </div>
        );
      }
    return (
        <div className="mx-auto text-center bg-black bg-opacity-50 max-w-3xl p-4 mt-10">
            <h1 className="text-lg text-white font-semibold mt-4 p-4">ola, {session.data.user?.name}</h1>
            <h2 className="text-md text-white p-4">qe haremos hoy: acomodar pleilist o juzgar canciones?</h2>
            <div className="md:flex w-3/4 mx-auto my-6">
                <Link className='minecraft-btn mx-4 flex w-50 justify-center text-white truncate p-2 border-2 border-b-4 hover:text-yellow-200' href='/home/playlists'>
                    acomodar plelis!
                </Link>
                <Link className='minecraft-btn mx-4 flex w-50 justify-center text-white truncate p-2 border-2 border-b-4 hover:text-yellow-200' href='/home/juzgar-playlist'>
                    juzgar canciones
                </Link>
            </div>
        </div>
    );
}