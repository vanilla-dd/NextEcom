"use server";

import { auth } from "@/auth";
import { stripe } from "@/server/stripe";

interface CheckoutSessionParams {
  currency: string;
  connectedId: string;
  priceId: string;
  price: number;
  productNamedUrl: string;
}

export const createCheckoutSession = async ({
  currency,
  connectedId,
  priceId,
  price,
  productNamedUrl,
}: CheckoutSessionParams) => {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      throw new Error("Authentication failed: User not logged in.");
    }

    const appFee = price * +process.env.APP_FEES_PERCENT!;

    const checkoutSession = await stripe.checkout.sessions.create(
      {
        currency: currency,
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&product=${productNamedUrl}`,
        allow_promotion_codes: true,
        customer_email: session.user.email!,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        payment_intent_data: {
          application_fee_amount: appFee,
        },
      },
      { stripeAccount: connectedId },
    );

    return checkoutSession.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
