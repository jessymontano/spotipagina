import spotifyProfile, { refreshAccessToken } from "./SpotifyProfile";
import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";

export type AuthUser = { //cosas de typescript
  name: string;
  email: string;
  image: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
};

const authOptions = { //nose se lo copie al github de spotify pero es para el next-auth
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 60, // 1hr
  },
  jwt: {
    maxAge: 60 *60,
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (!account) {
        return token;
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId,
      };

      if (Date.now() < updatedToken.expires_at) {
        return refreshAccessToken(updatedToken);
      }

      return updatedToken;
    },
    async session({ session, token }: { session: any; token: any }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;
      if(!session.user.session_expiry) {
        const exp = new Date(new Date().getTime() + 12*60*60*1000).toISOString();
        session.user.session_expiry = exp;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;