import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectDB from "./lib/db";
import User from "./models/user-model";
export const { handlers, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        await connectDB();

        try {
          const user = await User.findOne({ email: profile?.email });
          if (!user) {
            const newUser = await User.create({
              email: profile?.email,
              username: profile?.login,
              fullName: profile?.fullName,
              avatar: profile?.avatar_url,
            });

            await newUser.save(); // indicate successfully signin
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
