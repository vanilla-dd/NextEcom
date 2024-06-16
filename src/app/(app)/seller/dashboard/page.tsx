"use server";

import { auth } from "@/auth";
import ShowProducts from "@/components/connect/ShowProducts";
import ConnectStripe from "@/components/nav/ConnectStripe";
import { fetchConnectedAccountProducts } from "@/server/actions/getStripeAccProducts";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { stripe } from "@/server/stripe";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

async function page({ searchParams }: { searchParams: { code?: string } }) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/signup");
  }

  if (searchParams.code) {
    try {
      const response = await stripe.oauth.token({
        grant_type: "authorization_code",
        code: searchParams.code,
      });

      await db
        .update(users)
        .set({ connectId: response.stripe_user_id })
        .where(eq(users.id, session.user.id!));

      // Redirect to dashboard after successful OAuth
      redirect("/seller/dashboard");
    } catch (e) {
      console.error("OAuth token exchange error:", e);
      // Optionally handle the error, show a message to the user
      redirect("/error");
    }
  }

  const products = await fetchConnectedAccountProducts();

  return (
    <div>
      <ConnectStripe />
      <ShowProducts products={products} />
    </div>
  );
}

export default page;
