import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import local from "next/font/local";

//aqui se ponen cosas generales de toda la pagina (lo qe va en head y asi)
const inter = Inter({ subsets: ["latin"] });
const minecraftia = local({
  src: [
    {
      path: '../public/fonts/minecraftia_2.0_400-webfont.woff2',
      weight: '400',
    }
  ]
})

export const metadata: Metadata = {
  title: "Sorter de spotifai",
  description: "Sortear pleilis de spotifai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={minecraftia.className}>{children}</body>
    </html>
  );
}
