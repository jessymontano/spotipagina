"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

//otra cosa rara del spotifai
function AuthSessionProvider({
  session,
  children,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthSessionProvider;