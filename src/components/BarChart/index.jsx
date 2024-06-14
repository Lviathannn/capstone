import React from "react";
import tailwindConfig from "../../../tailwind.config.js";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colors = tailwindConfig.theme.extend.colors;
const COLORS = {
  Alam: colors.primary[800],
  "Seni dan Budaya": colors.primary[400],
  Sejarah: colors.primary[200],
};

const HorizontalBarChart = ({ width, height, dataDestinasi }) => {
  const totalValue = dataDestinasi?.reduce((acc, { total }) => acc + total, 0);
  const dataWithPercentage = dataDestinasi?.map(({ nama_kategori, total }) => ({
    nama_kategori,
    total,
    percentage: totalValue === 0 ? 0 : ((total / totalValue) * 100).toFixed(0) + "%",
    remainder: totalValue - total,
  }));

  const BarChartLabel = ({ y, value, index }) => {
    const { nama_kategori } = dataDestinasi[index];
    return (
      <text y={y-5} fill="#666" textAnchor="start" fontSize={14}>
        <tspan fontWeight="bold">{value}</tspan>
        <tspan>{` ${nama_kategori}`}</tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={dataWithPercentage}
        layout="vertical"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis
          type="number"
          domain={[0, totalValue]}
          axisLine={false}
          hide
        />
        <YAxis type="category" dataKey="nama_kategori" axisLine={false} hide />
        <Bar
          dataKey="total"
          fill={(data) => COLORS[data.nama_kategori]}
          barSize={10}
          stackId="a"
          radius={[5, 0, 0, 5]}
        >
          {dataDestinasi?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.nama_kategori]}
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
