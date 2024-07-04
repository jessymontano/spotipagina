import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//aqui se ponen cosas generales de toda la pagina (lo qe va en head y asi)
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
