"use client";

import { PlaylistsSkeleton } from "@/app/ui/Skeletons";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

if (!clientId) {
    throw new Error('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is undefined');
}

export default function Loading() {
  return (
    <div className="mx-auto bg-black bg-opacity-70 max-w-7xl p-10 mt-5 animate-pulse">
      <div className="text-center">
      <div className="text-lg font-semibold text-slate-100 mb-2"></div>
            <div className="flex items-center justify-center">
            <div className="relative">
            <div className="peer block bg-black border border-white py-[9px] pl-10 text-sm outline-2 w-64"
            />
            </div>
            <div className="bg-slate-300 flex w-50 justify-center text-white truncate p-2 border-2 border-b-4 hover:text-yellow-200'"></div>
            </div>
        <div className="text-lg font-semibold text-slate-100 mb-6"></div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-40">
          <PlaylistsSkeleton/>
      </div>
    </div>
  );
}