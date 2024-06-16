import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectDB from "./lib/db";
import User from "./models/user-model";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ account, profile }) {
      console.log(profile);

      if (account?.provider === "github") {
        await connectDB();

        try {
          const user = await User.findOne({ gid: profile?.id });

          // signup if user not fount
          if (!user) {
            const newUser = await User.create({
              gid: profile?.id,
              username: profile?.login,
              fullName: profile?.name,
              avatar: profile?.avatar_url,
            });

            await newUser.save(); // indicate successfully signup
            return true;
          }

          return true; // indicate successfully signin
        } catch (error) {
          console.log("Signin error", error);
          return false;
        }
      }
      return false; // indicate failed to signin
    },
  },
});
