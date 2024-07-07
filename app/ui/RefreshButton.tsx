import sdk from "@/app/lib/spotify-sdk/ClientInstance";
import { getPlaylists } from "../lib/spotify-sdk/utils";

export default function RefreshButton() {
    const handleClick = async () => {
        if (localStorage.getItem('playlists')) {
            localStorage.removeItem('playlists');
            await getPlaylists(sdk);
            window.location.reload();
            
        }
    };

    return(
        <button className='minecraft-btn p-4 mx-4 relative -mt-6 flex w-50 justify-center text-white truncate border-2 border-b-4 hover:text-yellow-200' onClick={handleClick}>
            <svg className='text-white pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2V2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2v2z" fill="currentColor"/> </svg>
        </button>
    )
}