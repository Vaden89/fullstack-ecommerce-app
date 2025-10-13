import { loginUser } from "@/action/auth";
import { authConfig } from "./auth.config";
import { UserInterface } from "@/types/user";
import type { DefaultJWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginFormSchema } from "@/types/form-schema/auth/login";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserInterface & DefaultSession["user"] & { access_token: string };
  }

  interface User extends UserInterface {
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserInterface & { access_token: string };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginFormSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new Error("Invalid Credentials");
        }

        const { email, password } = validatedFields.data;
        const response = await loginUser(email, password);

        if (!response || "error" in response) {
          throw new Error(response.message || "Something went wrong");
        }

        return {
          ...response.data.user,
          access_token: response.data.token,
        } as UserInterface & { access_token: string };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserInterface & { access_token: string };
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as UserInterface & {
          access_token: string;
          emailVerified: Date | null;
          id: string;
        };
      }

      return session;
    },
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
