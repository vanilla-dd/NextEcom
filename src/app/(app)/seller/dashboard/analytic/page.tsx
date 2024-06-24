"use server";

import { auth } from "@/auth";
import Charts from "@/components/analytic/Charts";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { db } from "@/server/db";
import { orderAnalytics, products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

async function page() {
  const session = await auth();

  if (!session || !session.user?.id) return;
  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.userId, session?.user?.id));

  // console.log(allProducts);
  const analytic = await db
    .select()
    .from(orderAnalytics)
    .where(
      eq(orderAnalytics.productId, "0527d760-1d54-4870-abab-a71d4d433fa1"),
    );
  // console.log(analytic);

  return (
    <ContentLayout title={"Analytic"}>
      <div>page</div>
      <Charts />
    </ContentLayout>
  );
}

export default page;
