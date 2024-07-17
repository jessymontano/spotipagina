'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    const session = useSession();
        return (
            <nav className="flex bg-black bg-opacity-70 sm:px-60 px-5 sm:pt-4 pt-4 pb-4 sticky top-0 z-30">
                <div className="flex-1">
                    <Link href='/home' className="font-bold text-white text-2xl">spotipagina</Link>
                </div>
                <div className="mx-6 mt-2">
                    <Link href='/home/playlists' className="font-bold text-white text-lg hover:text-blue-300">Playlists</Link>
                </div>
                <div className="mx-6 mt-2">
                    <Link href='/home/juzgar-playlist' className="font-bold text-white text-lg hover:text-blue-300">Juzgar</Link>
                </div>
                <div className="flex-none">
                    {!session || session.status !== 'authenticated' && (
                        
                        <button className='minecraft-btn flex w-40 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' onClick={() => signIn("spotify")}>Sign in</button>
                    ) }
                    {session && session.status === 'authenticated' && (
                        <div className="text-center items-center flex">
                            <button className='minecraft-btn flex w-40 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' onClick={() => signOut()}>Sign out</button>
                            <Image className="aspect-square object-cover ml-2" src={session.data.user?.image || '/images/temp.png'} alt={session.data.user?.name || 'user'} height={37} width={37} />
                      </div>
                    )}
                </div>
            </nav>
        )
}