import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import AuthSessionProvider from "@/app/ui/AuthSessionProvider";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import NavBar from "../ui/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <AuthSessionProvider session={session}>
        <body className={`${inter.className} bg-slate-950`}>
          <NavBar />
          {children}
          </body>
      </AuthSessionProvider>
    </html>
  );
}