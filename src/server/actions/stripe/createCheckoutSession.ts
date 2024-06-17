import { auth } from "@/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { stripe } from "@/server/stripe";
import { eq } from "drizzle-orm";

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
