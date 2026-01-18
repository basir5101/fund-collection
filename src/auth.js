// auth.js
export const runtime = "nodejs"; // Add this to force Node.js runtime
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          console.log("--- Login Attempt Start ---");
          await dbConnect();
          console.log("DB Connected successfully");

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.log(
              "Login Failed: No user found with email:",
              credentials.email,
            );
            return null; // Triggers CredentialsSignin
          }
          console.log("User found in DB:", user.email);

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isMatch) {
            console.log(
              "Login Failed: Password does not match for:",
              credentials.email,
            );
            return null; // Triggers CredentialsSignin
          }

          console.log("Login Success!");
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Critical Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // We must add the role to the JWT token and the Session
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
  },
});
