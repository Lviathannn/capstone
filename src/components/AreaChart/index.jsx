import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import tailwindConfig from "../../../tailwind.config.js";
const colors = tailwindConfig.theme.extend.colors;

const data = [
  {
    name: "Jan",
    Total: 600,
    Baru: 0,
  },
  {
    name: "Feb",
    Total: 380,
    Baru: 220,
  },
  {
    name: "Mar",
    Total: 400,
    Baru: 150,
  },
  {
    name: "Apr",
    Total: 600,
    Baru: 220,
  },
  {
    name: "Mei",
    Total: 320,
    Baru: 100,
  },
  {
    name: "Jun",
    Total: 180,
    Baru: 180,
  },
  {
    name: "Jul",
    Total: 300,
    Baru: 250,
  },
  {
    name: "Agu",
    Total: 700,
    Baru: 100,
  },
  {
    name: "Sep",
    Total: 950,
    Baru: 400,
  },
  {
    name: "Okt",
    Total: 320,
    Baru: 420,
  },
  {
    name: "Nov",
    Total: 800,
    Baru: 250,
  },
  {
    name: "Des",
    Total: 800,
    Baru: 250,
  },
];

export default function AreaChartComponent({ width, height }) {
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 10, right: 40, left: 0, bottom: 30 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="50%"
              stopColor={colors.primary[100]}
              stopOpacity={0.8}
            />
            <stop offset="95%" stopColor="#FAFAFA" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#FFF2CD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FAFAFA" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tick={{ fill: colors.neutral[800], fontSize: 14, fontWeight: 500 }}
          tickLine={0}
          axisLine={false}
        />
        <YAxis
          ticks={[0, 200, 400, 600, 800, 1000]}
          tick={{ fill: colors.neutral[800], fontSize: 14, fontWeight: 500 }}
          tickLine={0}
          axisLine={false}
        />
        <CartesianGrid strokeDasharray="3 0" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Total"
          stroke={colors.primary[400]}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="Baru"
          stroke={colors.secondary[200]}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}