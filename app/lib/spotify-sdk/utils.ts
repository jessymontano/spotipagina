import { SpotifyApi, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

export async function getPlaylists(sdk: SpotifyApi) {
    const storedPlaylists = localStorage.getItem('playlists');
    
    if (storedPlaylists) {
        return JSON.parse(storedPlaylists) as SimplifiedPlaylist[];
    }
    let playlists = Array();
    let offset = 0;
    let total: number = Number.POSITIVE_INFINITY;

    while (offset < total) {
        try {
            const playlistInfo = await sdk.currentUser.playlists?.playlists(50, offset);
            
            if (!playlistInfo || !playlistInfo.items) {
                break; 
            }
            playlists.push(...playlistInfo.items);
            offset += 50;
            total = playlistInfo.total;
        } catch (error) {
            console.error(error);
            break;
        }
    }

    const currentUser = await sdk.currentUser.profile();
    const userPlaylists = playlists.filter((playlist) => {
        return playlist.owner.id === currentUser.id;
    })

    localStorage.setItem('playlists', JSON.stringify(userPlaylists));
    
    return userPlaylists;
}