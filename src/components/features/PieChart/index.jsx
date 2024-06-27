import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import tailwindConfig from "../../../../tailwind.config.js";

export default function PieChartComponent({ width, height, dataVid }) {
  const totalContent = dataVid?.total_content || 0;
  const totalDestinasi = dataVid?.total_destinasi || 0;
  
  const dataVidContent = [
    { name: "Video", value: totalContent },
    { name: "Destinasi", value: totalDestinasi },
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
              className="outline-none"
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [value, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}