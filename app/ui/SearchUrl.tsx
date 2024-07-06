import { useSearchParams, usePathname, useRouter} from "next/navigation"
import { useState } from "react";

export default function SearchUrl() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [playlistId, setPlaylistId] = useState<string>('');

    const handleSubmit = () => {
        const params = new URLSearchParams(searchParams);
        playlistId ? params.set('playlistId', playlistId) : params.delete('playlistId');
        replace(`${pathname}/sort/?${params.toString()}`);
    };

    return (
        <>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Buscar con URL</h3>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <input 
                        placeholder='URL de la playlist' 
                        type="text" 
                        className="peer block bg-black border border-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 focus:outline-none m-4 focus:text-white"
                        onChange={(e) => setPlaylistId(e.target.value.split('/playlist/')[1])}
                    />
                    <svg 
                        className="pointer-events-none absolute left-7 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400"
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"> <path d="M4 6h7v2H4v8h7v2H2V6h2zm16 0h-7v2h7v8h-7v2h9V6h-2zm-3 5H7v2h10v-2z" fill="currentColor"/> </svg>
                </div>
                <button 
                    className="minecraft-btn flex w-50 justify-center text-white truncate p-2 border-2 border-b-4 hover:text-yellow-200"
                    onClick={handleSubmit}
                    >Buscar playlist</button>
            </div>
        </>
    )
}