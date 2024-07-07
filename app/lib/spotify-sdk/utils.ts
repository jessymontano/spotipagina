import { SpotifyApi, SimplifiedPlaylist, Track } from "@spotify/web-api-ts-sdk";

function getItemWithExpiry(key: string) {
    const storedItem = localStorage.getItem(key);

    if (!storedItem) {
        return null;
    }

    const item = JSON.parse(storedItem);
    const now = new Date().getTime();

    if (now > item.timestamp) {
        localStorage.removeItem(key);
        return null
    }

    return item.value;
}

export async function getPlaylists(sdk: SpotifyApi) {
    const storedPlaylists = getItemWithExpiry('playlists');
    
    if (storedPlaylists) {
        return storedPlaylists as SimplifiedPlaylist[];
    } else {
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
    
    const item = {value: userPlaylists, timestamp: new Date().getTime() + 3600000}
    localStorage.setItem('playlists', JSON.stringify(item));
    
    return userPlaylists;
}
}

export async function getPlaylistInfo(sdk: SpotifyApi, playlistId: string) {
    const {name, images} = await sdk.playlists.getPlaylist(playlistId, 'MX', 'name, images');

    const info = {name: name, imageUrl: images[0].url};
    return info
}

async function getPlaylistTracks(sdk: SpotifyApi, id: string) {
    let tracks: Track[] = [];
    let offset = 0;
    let total: number = Number.POSITIVE_INFINITY;
    
    while (offset < total) {
        try {
            let playlistTracks = await sdk.playlists.getPlaylistItems(id, 'MX', 'items(track(album(release_date,total_tracks,id),disc_number,track_number,id,uri)),total', 50, offset);
            if (!playlistTracks || !playlistTracks.items) {
                break;
            }
            const extractedTracks = playlistTracks.items.map(item => item.track);
            tracks.push(...extractedTracks);
            
            offset += 50;
            total = playlistTracks.total;
        } catch (error) {
            console.error(error);
        }
    }
    return tracks;
}

async function sortPlaylist(playlist: Track[], order: boolean) {
    let albums: {[albumId: string]: Track[]} = {};
    playlist.map((track) => {
        let albumId = track.album.id;
        if (!(albumId in albums)) {
            albums[albumId] = [];
        }
        albums[albumId].push(track);
    });

    for (const albumId in albums) {
        const album = albums[albumId];
        album.sort((a, b) => {
            
            if (a.disc_number !== b.disc_number) {
                return a.disc_number - b.disc_number;
            } 
            return a.track_number - b.track_number;
        })
    }

    const sortedAlbums = Object.entries(albums)
    .sort((a, b) => {
        const dateA = new Date(a[1][0].album.release_date).getTime();
        const dateB = new Date(b[1][0].album.release_date).getTime();

        return order ? dateB - dateA : dateA - dateB;
    })
    .reduce((acc, [albumId, tracks]) => {
        acc[albumId] = tracks;
        return acc;
    }, {} as { [albumId:string]: Track[] })

    const sortedPlaylist = Object.values(sortedAlbums).reduce((acc, tracks) => {
        acc.push(...tracks);
        return acc;
    }, [] as Track[]);
    return sortedPlaylist;
}

export async function updatePlaylist(sdk: SpotifyApi, playlistId: string, order: boolean, updateProgress: (progress: number) => void) {
    const playlistItems = await getPlaylistTracks(sdk, playlistId);
    const sortedPlaylistItems = await sortPlaylist(playlistItems, order);
    
    let snapshot: null | string = null;
    let playlistUris = playlistItems.map((item) => {
        return item.uri;
    });
    const sortedUris = sortedPlaylistItems.map((item) => {
        return item.uri;
    });
    
    for (let i = 0; i < sortedPlaylistItems.length; i++) {
        let sortedUri = sortedUris[i];

        if (!playlistUris.includes(sortedUri)) continue;
        let j = playlistUris.indexOf(sortedUri);

        if (j !== i) {
            if (!snapshot) {
                let response = await sdk.playlists.updatePlaylistItems(playlistId, {range_start: j, range_length: 1, insert_before: i});
                snapshot = response.snapshot_id;
            } else {
                let response = await sdk.playlists.updatePlaylistItems(playlistId, {range_start: j, range_length: 1, insert_before: i, snapshot_id: snapshot});
                snapshot = response.snapshot_id;
            }
            playlistUris.splice(i, 0, playlistUris.splice(j, 1)[0]);
            updateProgress(Math.round(((i + 1) / sortedPlaylistItems.length) * 100));
        }
    }
}