import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import tailwindConfig from "../../../tailwind.config.js";

export default function PieChartComponent({ width, height, dataVid }) {
  const total = dataVid?.total_content + dataVid?.total_destinasi;
  
  const dataVidContent = [
    { name: "Video", value: (dataVid?.total_content / total) * 100 },
    { name: "Destinasi", value: (dataVid?.total_destinasi / total) * 100 },
  ];
  
  const colors = tailwindConfig.theme.extend.colors;
  
  const COLORS = {
    Video: colors.primary[500],
    Destinasi: colors.primary[100],
  };
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          dataKey="value"
          data={dataVidContent}
          cx="50%"
          cy="50%"
          outerRadius="100%"
          stroke="none"
        >
          {dataVidContent.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name]}
              className=" outline-none"
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
