import { PieChart, Pie, Tooltip, ResponsiveContainer, Label, Cell } from "recharts";
import tailwindConfig from "../../../../tailwind.config.js";

export default function DonutChartComponent({ width, height, dataDestinasi }) {
  const colors = tailwindConfig.theme.extend.colors;
  const COLORS = {
    "Alam": colors.primary[800],
    "Seni dan Budaya": colors.primary[400],
    "Sejarah": colors.primary[200],
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { nama_kategori, total } = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white px-2 py-3 border border-gray-300">
          <p className="">{`${nama_kategori} : ${total}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={dataDestinasi}
          dataKey="total"
          outerRadius={100}
          innerRadius={80}
          cx="50%"
          cy="50%"
          stroke="none"
        >
          {dataDestinasi?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.nama_kategori]} />
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
