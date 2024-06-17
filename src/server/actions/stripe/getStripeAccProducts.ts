"use server";

import { auth } from "@/auth";
import { ProductWithDefaultPrice } from "@/lib/helpers";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { stripe } from "@/server/stripe";
import { eq } from "drizzle-orm";

export const getAccountProducts = async (
  stripeAccount: string,
): Promise<ProductWithDefaultPrice[]> => {
  try {
    const products = await stripe.products.list(
      { expand: ["data.default_price"] },
      { stripeAccount },
    );
    return products.data as ProductWithDefaultPrice[];
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
