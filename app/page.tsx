import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-300">
      <h1>Sorter de playlists de Spotify</h1>
      <Link href="/login"> Log in </Link>
    </main>
  );
}
