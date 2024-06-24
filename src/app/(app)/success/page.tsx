"use server";

import { auth } from "@/auth";
import Failure from "@/components/purchase/Failure";
import Success from "@/components/purchase/Success";
import { db } from "@/server/db";
import { orderAnalytics, orders, products } from "@/server/db/schema";
import { stripe } from "@/server/stripe";
import { and, eq, sql } from "drizzle-orm";
import React from "react";

async function authenticateUser() {
  const authResponse = await auth();
  const user = authResponse?.user;
  if (!user?.id) {
    throw new Error("User not authenticated.");
  }
  return user;
}

async function getProduct(searchParams: { product: string }) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.namedUrl, searchParams.product));
  if (!product) {
    throw new Error("Product not found.");
  }
  return product;
}

async function getStripeSession(
  searchParams: { session_id: string; product: string },
  product: any,
) {
  const session = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
    { stripeAccount: product.stripeConnectId },
  );
  if (!session) {
    throw new Error("Stripe session not found.");
  }
  return session;
}

async function checkExistingOrder(product: any, session: any, user: any) {
  const [existingOrder] = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.productId, product.id),
        eq(orders.sessionId, session.id),
        eq(orders.userId, user.id),
      ),
    )
    .limit(1);
  return existingOrder;
}

async function fetchRedeemCode(product: any) {
  try {
    const response = await fetch(product.csvUrl!);
    const text = await response.text();
    const rows = text.split("\n");
    const parsedCsv = rows.map((row) => row.split(","));
    return parsedCsv[product.usedCodes! + 1][0]; // Assuming redeem code is in the first column
  } catch (fetchError: any) {
    console.error("Error fetching CSV:", fetchError.message);
    throw new Error("Error fetching CSV data.");
  }
}

async function insertOrder(
  product: any,
  session: any,
  user: any,
  redeemCode: string,
) {
  const newOrder = {
    price: product.price,
    productId: product.id,
    sessionId: session.id,
    status: session.payment_status,
    stripeId: session.customer as string,
    userId: user.id,
    currency: product.currency,
    redeemCode: redeemCode,
  };
  await db.insert(orders).values(newOrder);
}

async function updateProductUsage(product: any) {
  await db
    .update(products)
    .set({ usedCodes: product.usedCodes! + 1 })
    .where(eq(products.namedUrl, product.namedUrl));
}

async function updateAnalytics(product: any) {
  const now = new Date();

  try {
    await db
      .insert(orderAnalytics)
      .values({
        productId: product.id,
        lastOrderAt: now,
        totalOrders: 1,
        totalRevenue: product.price,
      })
      .onConflictDoUpdate({
        target: orderAnalytics.productId,
        set: {
          lastOrderAt: now,
          totalOrders: sql`${orderAnalytics.totalOrders} + 1`,
          totalRevenue: sql`${orderAnalytics.totalRevenue} + ${product.price}`,
        },
      });
  } catch (error: any) {
    console.error("Error updating analytics:", error.message);
    throw new Error("Failed to update analytics");
  }
}

async function page({
  searchParams,
}: {
  searchParams: { session_id: string; product: string };
}) {
  try {
    const user = await authenticateUser();
    const product = await getProduct(searchParams);
    const session = await getStripeSession(searchParams, product);

    if (session.payment_status === "unpaid") {
      return <Failure />;
    }

    const existingOrder = await checkExistingOrder(product, session, user);
    if (existingOrder) {
      return <Success redeemCode={existingOrder.redeemCode} />;
    }

    const redeemCode = await fetchRedeemCode(product);
    await insertOrder(product, session, user, redeemCode);
    await updateProductUsage(product);
    await updateAnalytics(product);

    return <Success redeemCode={redeemCode} />;
  } catch (error: any) {
    console.error("Error in processing:", error.message);
    return <div>Error occurred. Please try again later.</div>;
  }
}

export default page;
