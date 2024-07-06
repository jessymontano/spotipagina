import Image from "next/image"

function PlaylistSkeleton() {
    return (
        <div className="minecraft-btn border-2 border-b-4 p-2 shadow-sm text-center">
            <div className="flex p-4">
                <Image 
                    src={'/images/temp.png'} 
                    alt={'temp image'}
                    width={200}
                    height={200}
                    className="aspect-square cover animate-pulse"
                />
            </div>
            <div>
                <h3 className="ml-2 text-sm font-medium text-white pb-4">...</h3>
            </div>
        </div>
    )
}

export function PlaylistsSkeleton() {
    return (
        <>
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        </>
    )
}