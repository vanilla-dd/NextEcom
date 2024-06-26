"use client";

import { useMounted } from "@/hooks/useMounted";
import React from "react";
import { AreaChart, Tooltip, Area, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

type AnalyticsData = {
  date: string;
  revenue?: number;
  predicted?: number;
};
const Charts: React.FC<{ analytics: AnalyticsData[] }> = ({ analytics }) => {
  const mounted = useMounted();
  if (!mounted) return null;
  dayjs.extend(isSameOrBefore);
  interface AnalyticsData {
    date: string;
    revenue?: number;
    predicted?: number | null;
  }

  const transformData = (data: AnalyticsData[]) => {
    const transformedData: AnalyticsData[] = [];
    const currentDate = dayjs();
    const lastDayOfMonth = currentDate.endOf("month");
    let currentDay = currentDate.startOf("month");

    while (currentDay.isSameOrBefore(lastDayOfMonth, "day")) {
      const dateStr = currentDay.format("YYYY-MM-DD");

      // Find the corresponding record in data
      const record = data.find((item) => item.date === dateStr);

      if (record) {
        // If there is a record for the current day, push it to transformedData
        transformedData.push({
          date: dateStr,
          revenue: record.revenue || 0,
          predicted: null, // Initialize predicted as null by default
        });
      } else {
        // If no record is found, create a new entry with predicted revenue
        const predicted = findPredictedRevenue(data, dateStr);
        transformedData.push({
          date: dateStr,
          revenue: 0,
          predicted: predicted !== undefined ? predicted : null,
        });
      }

      // Move to the next day
      currentDay = currentDay.add(1, "day");
    }

    // Calculate predictions for future days based on previous revenue
    for (let i = 1; i < transformedData.length; i++) {
      if (transformedData[i].predicted === null) {
        transformedData[i].predicted = transformedData[i - 1].revenue || 0;
      }
    }

    return transformedData;
  };

  // Helper function to find predicted revenue based on the last available revenue
  const findPredictedRevenue = (
    data: AnalyticsData[],
    currentDate: string,
  ): number | undefined => {
    const currentIndex = data.findIndex((item) => item.date === currentDate);
    if (currentIndex === -1) return undefined;

    // Find the last available revenue
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (data[i].revenue !== undefined) {
        return data[i].revenue;
      }
    }

    return undefined; // No prediction found
  };

  const data = transformData(analytics);
  console.log(data);
  return (
    <ResponsiveContainer className="max-w-80" height={40}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />

        <Area
          type="monotone"
          dataKey="predicted"
          stroke="#8884ff"
          fillOpacity={1}
          strokeDasharray="1 3"
          fill="transparent"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Charts;
