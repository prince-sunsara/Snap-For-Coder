import { Session } from "next-auth";
import { NextRequest } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      const user = auth?.user;

      // user visited chat page ?
      const isVisitingChatPage = request.nextUrl.pathname.startsWith("/chat");

      //
      const isVisitingAuthtPage =
        request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/signup");

      if (!user && isVisitingChatPage) {
        return false;
      }

      if (user && isVisitingAuthtPage) {
        return Response.redirect(new URL("/chat", request.nextUrl));
      }

      return true;
    },
  },
};

//? NOTE: this files defines the behaviour related to user authorization and redirects
