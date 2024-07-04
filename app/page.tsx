import Link from "next/link";

//aqui se ponen cosas qe van en toda la pagina como un nav o sidebar 
export default function Home() {
  return (
    <main>
      <h1>Sorter de playlists de Spotify</h1>
      <Link href="/login"> Log in </Link>
    </main>
  );
}
