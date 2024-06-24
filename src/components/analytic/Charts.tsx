"use client";

import { useMounted } from "@/hooks/useMounted";
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

const Charts = () => {
  const mounted = useMounted();
  if (!mounted) return null;

  const data = [
    {
      name: "helo",
      revenue: 200,
    },
    {
      name: "helo",
      revenue: 210,
    },
    {
      name: "helo",
      revenue: 290,
    },
    {
      name: "helo",
      revenue: 200,
    },
    {
      name: "helo",
      revenue: 181,
    },
    {
      name: "helo",
      revenue: 900,
    },
    {
      name: "helo",
      revenue: 700,
    },
    {
      name: "helo",
      revenue: 200,
    },
    {
      name: "helo",
      revenue: 281,
    },
    {
      name: "helo",
      revenue: 500,
    },
    {
      name: "helo",
      revenue: 100,
    },
  ];

  return (
    <ResponsiveContainer
      maxHeight={50}
      height={50}
      // width={400}
      className={"max-w-80"}
    >
      <AreaChart
        width={300}
        height={50}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 0"
          vertical={false}
          horizontal={false}
        />
        <XAxis dataKey="name" hide={true} />
        {/* <YAxis /> */}
        <Tooltip wrapperClassName="" labelClassName="" />
        <Area
          type="basis"
          dataKey="revenue"
          stroke="#06b6d4"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Charts;
