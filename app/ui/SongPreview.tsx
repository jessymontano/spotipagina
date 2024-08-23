import type {Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";
import Marquee from "react-fast-marquee";

export default function SongPreview({track, onSwipeLeft, onSwipeRight} : {track: Track; onSwipeLeft: (trackUri: string) => void; onSwipeRight: () => void}) {
    const audio = useRef<HTMLAudioElement>(null);
    const [{x}, set] = useSpring(() => ({x:0}));
    const bind = useDrag(({movement: [mx], down}) => {
        if (!down && mx < -150) {
            onSwipeLeft(track.uri);
        } else if (!down && mx > 150) {
            onSwipeRight();
        }

        set({
            x: down? mx: 0,
            immediate:down
        });
    });
    useEffect(() => {
        if (audio.current) {
            audio.current.play();
        }
    })
    
    return (
        <animated.div {...bind()}
         className="relative touch-none rounded-md flex bg-slate-200 justify-center items-center"
         style={{
            x,
            width: '50vh',
            height: '80vh'
        }}>
            <div className="grid grid-flow-row px-12">
                <Marquee speed={30}>
                <h1 className="text-slate-900 text-lg text-center my-2 select-none">{track.name} - {track.artists[0].name}&emsp;</h1>
                </Marquee>
                <Image className="mx-auto" src={track.album.images ? track.album.images[0].url : "/images/temp.png"} alt={track.name ?? 'cancion'} height={200} width={200} draggable={false}></Image>
            </div>
            <audio ref={audio} src={track.preview_url ?? ""}></audio>
            <div style={{position: 'absolute', left: '30px', top: '50%'}}>
                <span>NO</span>
            </div>
            <div style={{position: 'absolute', right: '30px', top: '50%'}}>
                <span>SI</span>
            </div>
        </animated.div>
    );
}