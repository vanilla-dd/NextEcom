"use server";

import { auth } from "@/auth";
import { stripe } from "../stripe";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { redirect } from "next/navigation";

export const getAccountProducts = async (stripeAccount: string) => {
  try {
    const products = await stripe.products.list(
      { type: "service" },
      { stripeAccount },
    );
    return products.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export async function fetchConnectedAccountProducts() {
  const session = await auth();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id!),
  });
  if (!user || !user.connectId) {
    console.error("User not found or no connected account ID");
    return [];
  }
  const products = await getAccountProducts(user.connectId);
  return products;
}

export async function createCheckoutSession(
  priceId: { priceId: string },
  connectId: string,
) {
  const session = await auth();
  const user = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id!),
  });
  if (!user || !user.connectId) {
    console.error("User not found or no connected account ID");
    return [];
  }
  console.log(priceId.priceId);
  const stripeSession = await stripe.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId.priceId,
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${process.env.BASE_URL}/payment/successful`,
      cancel_url: `${process.env.BASE_URL}/payment/cancel`,
    },
    {
      stripeAccount: connectId,
    },
  );
  return stripeSession.url;
}

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
