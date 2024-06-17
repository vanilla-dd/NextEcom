"use server";

import { auth } from "@/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { stripe } from "@/server/stripe";
import { eq } from "drizzle-orm";

export async function linkAccount(code: string) {
  const session = await auth();
  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code,
    });

    await db
      .update(users)
      .set({ connectId: response.stripe_user_id })
      .where(eq(users.id, session?.user?.id!));

    // Redirect to dashboard after successful OAuth
  } catch (e) {
    console.error("OAuth token exchange error:", e);
  }
}
