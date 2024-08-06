'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    const session = useSession();
        return (
            <nav className="flex bg-black bg-opacity-70 px-5 py-4 sticky top-0 z-30 items-center justify-between">
                <div className="lg:flex-1">
                    <Link href='/home' className="font-medium lg:font-bold text-white text-md lg:text-2xl">spotipagina</Link>
                </div>
                <div className="ml-3 md:mx-6 md:mt-2">
                    <Link href='/home/playlists' className="font-medium lg:font-bold text-white text-sm lg:text-lg hover:text-blue-300">Playlists</Link>
                </div>
                <div className="ml-3 md:mx-6 md:mt-2">
                    <Link href='/home/juzgar-playlist' className="font-medium lg:font-bold text-white text-sm lg:text-lg hover:text-blue-300">Juzgar</Link>
                </div>
                <div className="flex-none">
                    {!session || session.status !== 'authenticated' && (
                        
                        <button className='minecraft-btn flex w-15 lg:w-40 text-sm lg:text-base justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' onClick={() => signIn("spotify")}>Sign in</button>
                    ) }
                    {session && session.status === 'authenticated' && (
                        <div className="text-center items-center flex">
                            <button className='minecraft-btn flex w-15 lg:w-40 text-sm lg:text-base justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' onClick={() => signOut()}>Sign out</button>
                            <Image className="aspect-square object-cover ml-2 hidden md:block" src={session.data.user?.image || '/images/temp.png'} alt={session.data.user?.name || 'user'} height={37} width={37} />
                      </div>
                    )}
                </div>
            </nav>
        )
}