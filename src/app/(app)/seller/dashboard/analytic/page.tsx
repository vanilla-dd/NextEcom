"use server";

import { auth } from "@/auth";
import Charts from "@/components/analytic/Charts";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { db } from "@/server/db";
import { orderAnalytics, orders, products } from "@/server/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import React from "react";
import dayjs from "dayjs";

async function page() {
  const session = await auth();

  if (!session || !session.user?.id) return;

  return (
    <ContentLayout title={"Analytic"}>
      <div>page</div>
      <Charts />
    </ContentLayout>
  );
}

export default page;
