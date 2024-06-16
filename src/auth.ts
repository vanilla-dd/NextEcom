import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { signInSchema } from "@/lib/helpers";
import { db } from "./server/db";
import { users } from "./server/db/schema";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { stripe } from "./server/stripe";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  events: {
    createUser: async ({ user }) => {
      const stripeAcc = await stripe.customers.create({
        email: user.email!,
      });
      await db
        .update(users)
        .set({ stripeId: stripeAcc.id })
        .where(eq(users.id, user.id!));
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = await signInSchema.safeParseAsync(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
