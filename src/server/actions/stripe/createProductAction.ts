"use server";

import { auth } from "@/auth";
import { createProductSchema } from "@/lib/helpers";
import { db } from "@/server/db";
import { productStripeDetails, products, users } from "@/server/db/schema";
import { stripe } from "@/server/stripe";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const createProductAction = async (
  values: z.infer<typeof createProductSchema>,
  namedUrl: string,
) => {
  const session = await auth();
  if (!session || !session.user?.id) return;

  const getStripeId = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!getStripeId?.connectId) return;

  const sellerDetails = await stripe.balance.retrieve({
    stripeAccount: getStripeId.connectId,
  });

  if (!values.redeemCodeUrl) return;
  const response = await fetch(values.redeemCodeUrl);
  const text = await response.text();
  if (!text) return;
  async function parsedCsv() {
    const rows = text.split("\n");
    const parsedCsv = rows.map((row) => row.split(","));
    return parsedCsv.length;
  }
  const redeemCodeLength = await parsedCsv();

  const productInfo = await db
    .insert(products)
    .values({
      description: values.productPitch,
      stripeConnectId: getStripeId.connectId,
      name: values.productName,
      type: "redeem",
      namedUrl: namedUrl,
      inventory: redeemCodeLength,
      imageUrl: values.productFeaturedImage,
      csvUrl: values.redeemCodeUrl,
      supportEmail: values.supportEmail,
      userId: session.user.id,
      websiteUrl: values.websiteURL,
      currency: sellerDetails.available[0].currency,
      price: values.price,
      usedCodes: 0,
    })
    .returning();

  const product = await stripe.products.create(
    {
      name: values.productName,
      active: true,
      default_price_data: {
        unit_amount: values.price * 100,
        currency: sellerDetails.available[0].currency ?? "inr",
      },
      description: values.productPitch,
    },
    { stripeAccount: getStripeId?.connectId },
  );

  if (!product || !product.default_price) return;
  await db.insert(productStripeDetails).values({
    defaultPrice: product.default_price.toString(),
    description: product.description,
    stripeId: product.id,
    imageUrl: "",
    name: product.name,
    productId: productInfo[0].id,
  });
};
