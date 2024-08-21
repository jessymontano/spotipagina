import type {Track } from "@spotify/web-api-ts-sdk";
import { useRef } from "react";
import Image from "next/image";

export default function SongPreview({track} : {track: Track}) {
    const audio = useRef<HTMLAudioElement>(null);
    const handleMouseOver = () => {
        if (audio.current) {
            audio.current.play().catch();
        }
    }
    const handleMouseOut = () => {
        if (audio.current) {
            audio.current.pause();
            audio.current.currentTime = 0;
        }
    }
    return (
            <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <Image src={track.album.images ? track.album.images[0].url : "/images/temp.png"} alt={track.name ?? 'cancion'} height={200} width={200}></Image>
                <audio ref={audio} src={track.preview_url ?? ""}></audio>
            </div>
    );
}