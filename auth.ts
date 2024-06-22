import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectDB from "./lib/db";
import User from "./models/user-model";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          scope: "user:email", // Add the scope here
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      try {
        await connectDB();
        if (session.user) {
          // console.log(session.user);

          const user = await User.findOne({ email: session.user.email });
          // console.log(user);
          if (user) {
            session.user._id = user._id;
            return session;
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Invalid Session");
      }
    },
    async signIn({ account, profile }) {
      // console.log(profile); // for debugg

      if (account?.provider === "github") {
        try {
          await connectDB();
          const user = await User.findOne({ email: profile?.email });

          // signup if user not fount
          if (!user) {
            const newUser = await User.create({
              email: profile?.email,
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
