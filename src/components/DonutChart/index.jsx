import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Label, Cell } from "recharts";
import tailwindConfig from "../../../tailwind.config.js";

const data = [
  { name: "Alam", value: 50 },
  { name: "Seni Budaya", value: 30 },
  { name: "Sejarah", value: 20 },
];

const colors = tailwindConfig.theme.extend.colors;
const COLORS = {
  Alam: colors.primary[800],
  "Seni Budaya": colors.primary[400],
  Sejarah: colors.primary[200],
};

export default function DonutChartComponent({ width, height }) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          innerRadius={80}
          cx="50%"
          cy="50%"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
          <Label
            value="3 Kategori"
            position="center"
            fontSize="18"
            fontWeight="bold"
            dy={-10}
            fill={colors.primary[600]}
          />
          <Label
            value="Destinasi"
            position="center"
            fontSize="16"
            dy={10}
            fill={colors.neutral[900]}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}