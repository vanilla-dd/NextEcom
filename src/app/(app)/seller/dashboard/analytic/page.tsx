"use server";

import { auth } from "@/auth";
import Charts from "@/components/analytic/Charts";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { db } from "@/server/db";
import { orderAnalytics } from "@/server/db/schema";
import { and, between, eq } from "drizzle-orm";
import dayjs from "dayjs";

type AnalyticsData = {
  date: string;
  revenue: number;
};

async function getMonthlyAnalytics(
  productId: string,
): Promise<AnalyticsData[]> {
  const startDate = dayjs().startOf("month").toDate();
  const endDate = dayjs().endOf("month").toDate();

  const analytics = await db
    .select()
    .from(orderAnalytics)
    .where(
      and(
        between(orderAnalytics.date, startDate, endDate),
        eq(orderAnalytics.productId, productId),
      ),
    );

  const dailyRevenue: { [date: string]: number } = {};

  analytics.forEach((record) => {
    const date = dayjs(record.date).format("YYYY-MM-DD");
    if (!dailyRevenue[date]) {
      dailyRevenue[date] = 0;
    }
    dailyRevenue[date] += record.revenue;
  });

  const result = Object.keys(dailyRevenue).map((date) => ({
    date,
    revenue: dailyRevenue[date],
  }));

  return result;
}

async function page() {
  const session = await auth();

  if (!session || !session.user?.id) return null;

  const analytics = await getMonthlyAnalytics(
    "0527d760-1d54-4870-abab-a71d4d433fa1",
  );

  return (
    <ContentLayout title={"Analytic"}>
      <div>page</div>
      <Charts analytics={analytics} />
    </ContentLayout>
  );
}

export default page;
