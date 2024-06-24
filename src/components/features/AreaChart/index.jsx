import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import tailwindConfig from "../../../../tailwind.config.js";
const colors = tailwindConfig.theme.extend.colors;


export default function AreaChartComponent({ width, height, dataGraph }) {
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
        data={dataGraph}
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
          dataKey="bulan"
          tick={{ fill: colors.neutral[800], fontSize: 14, fontWeight: 500 }}
          tickLine={0}
          axisLine={false}
        />
        <YAxis
          ticks={[0, 50, 100, 150, 200, 250]}
          tick={{ fill: colors.neutral[800], fontSize: 14, fontWeight: 500 }}
          tickLine={0}
          axisLine={false}
        />
        <CartesianGrid strokeDasharray="3 0" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total_pengguna"
          name="Total Pengguna"
          stroke={colors.primary[400]}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pengguna_baru"
          name="Pengguna Baru"
          stroke={colors.secondary[200]}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}