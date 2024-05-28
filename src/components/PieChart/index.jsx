import { PieChart, Pie, Tooltip, Cell } from "recharts";
import tailwindConfig from "../../../tailwind.config.js";

const data01 = [
  { name: "Destinasi", value: 65 },
  { name: "Video", value: 35 },
];

const colors = tailwindConfig.theme.extend.colors;

const COLORS = {
  Destinasi: colors.primary[100], 
  Video: colors.primary[500], 
};

export default function PieChartComponent({ width, height }) {
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