import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // session: { strategy: "jwt" },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    // For JWT sessions, but can't be implemented now because jwt sessions can't have role based auth 7/09/2022
    // async jwt(props) {
    //   const { token, user } = props;
    //   if (user) {
    //     token.id = user.id;
    //     token.role = user.role;
    //   }
    //   return props.token;
    // },
    // session({ session, token, user }) {
    //   if (session.user) {
    //     session.user.id = token.id;
    //     session.user.role = token.role; // Add role value to user object so it is passed along with session
    //   }
    //   return session;
    // },
    session({ session, user }) {
      console.log("user:", user);
      if (session.user) {
        session.user.id = user.id;
        session.user.isNameSet = user.isNameSet; // Add role value to user object so it is passed along with session
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
