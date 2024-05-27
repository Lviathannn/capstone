import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data01 = [
  { name: "Destinasi", value: 65 },
  { name: "Video", value: 35 },
];

import tailwindConfig from "../../../tailwind.config.js";
const colors = tailwindConfig.theme.extend.colors;

const COLORS = {
  Destinasi: colors.primary[500], // Example color for Destinasi
  Video: colors.primary[100], // Example color for Video
};

export default function PieChartComponents({ width, height }) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        dataKey="value"
        data={data01}
        cx={50}
        cy={50}
        outerRadius={55}
        stroke="none"
      >
        {data01.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[entry.name]} className=" outline-none"/>
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}