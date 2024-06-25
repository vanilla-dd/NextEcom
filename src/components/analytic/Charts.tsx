"use client";

import { useMounted } from "@/hooks/useMounted";
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Charts = () => {
  const mounted = useMounted();
  if (!mounted) return null;

  const data = [
    { date: "2024-06-01", revenue: 0 },
    { date: "2024-06-02", revenue: 5 },
    { date: "2024-06-03", revenue: 9 },
    { date: "2024-06-04", revenue: 8 },
    { date: "2024-06-05", revenue: 1 },
    { date: "2024-06-06", revenue: 9 },
    { date: "2024-06-07", revenue: 6 },
    { date: "2024-06-08", revenue: 8 },
    { date: "2024-06-09", revenue: 4 },
    { date: "2024-06-10", revenue: 2 },
    { date: "2024-06-24", revenue: 5, predicted: 5 },
    { date: "2024-06-25", predicted: 10 },
    { date: "2024-06-26", predicted: 5 },
    { date: "2024-06-27", predicted: 1 },
    { date: "2024-06-28", predicted: 6 },
    { date: "2024-06-29", predicted: 3 },
    { date: "2024-06-30", predicted: 9 },
  ];

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
