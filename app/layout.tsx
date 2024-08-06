import type { Metadata } from "next";
import "./globals.css";
import local from "next/font/local";

const minecraftia = local({
  src: [
    {
      path: '../public/fonts/minecraftia_2.0_400-webfont.woff2',
      weight: '400',
    }
  ]
})

export const metadata: Metadata = {
  title: "Sorter de spotify",
  description: "Sortear playlists de spotify",
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
