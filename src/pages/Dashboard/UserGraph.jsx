import AreaChartComponent from "@/components/AreaChart";

export default function UserGraph() {
  return (
    <div className="rounded-xl border border-primary-300 bg-neutral-50">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-lg font-bold text-neutral-800">
          Grafik Pertumbuhan Pengguna
        </h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary-400" />
            <p className=" text-sm font-medium text-neutral-900">
              Total Pengguna
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-secondary-400" />
            <p className=" text-sm font-medium text-neutral-900">
              Pengguna Baru
            </p>
          </div>
        </div>
      </div>
      <AreaChartComponent width="100%" height={250} />
    </div>
  );
}
