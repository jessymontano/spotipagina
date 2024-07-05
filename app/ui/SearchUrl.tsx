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
            <input 
            placeholder='url de la pleilis' 
            type="text" 
            className="placeholder:text-slate-400 rounded-md p-3 m-4 border-x-0 border-t-0 border-b-3 border-solid border-b-slate-500 bg-slate-700 focus:outline-none text-white"
            onChange={(e) => setPlaylistId(e.target.value.split('/playlist/')[1])}
            />
            <button 
            className="bg-slate-500 text-slate-100 rounded-md p-3"
            onClick={handleSubmit}
            >Buscar playlist</button>
        </>
    )
}