import tailwindConfig from "../../../../tailwind.config.js";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Alam", value: 100 },
  { name: "Seni Budaya", value: 30 },
  { name: "Sejarah", value: 30 },
];

const colors = tailwindConfig.theme.extend.colors;
const COLORS = {
  Alam: colors.primary[800],
  "Seni Budaya": colors.primary[400],
  Sejarah: colors.primary[200],
};

const HorizontalBarChart = ({ width, height }) => {
  const totalValue = data.reduce((acc, { value }) => acc + value, 0);
  const dataWithPercentage = data.map(({ name, value }) => ({
    name,
    value,
    percentage:
      totalValue === 0 ? 0 : ((value / totalValue) * 100).toFixed(0) + "%",
    remainder: totalValue - value,
  }));

  const BarChartLabel = ({ y, value, name }) => (
    <text y={y - 5} fill="#666" textAnchor="start" fontSize={14}>
      <tspan fontWeight="bold">{value}</tspan>
      <tspan>{` ${name}`}</tspan>
    </text>
  );

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={dataWithPercentage}
        layout="vertical"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis type="number" axisLine={false} hide />
        <YAxis type="category" axisLine={false} hide />
        <Bar
          dataKey="value"
          fill={(data) => COLORS[data.name]}
          barSize={10}
          stackId="a"
          radius={[5, 0, 0, 5]}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name]}
              className="outline-none"
            />
          ))}
          <LabelList
            dataKey="percentage"
            position="top"
            fill="#262626"
            content={(props) => <BarChartLabel {...props} />}
          />
        </Bar>
        <Bar
          dataKey="remainder"
          fill="#D3D3D3"
          barSize={10}
          stackId="a"
          radius={[0, 5, 5, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
