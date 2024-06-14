import HorizontalBarChart from "@/components/BarChart";
import DonutChartComponent from "@/components/DonutChart";

export default function DestinationGraph({dataDestinasi}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-primary-300 bg-neutral-50 px-4 pt-6">
      <h1 className="text-lg font-bold text-neutral-800">Kategori Destinasi</h1>
      <div className="h-52 w-full">
        <DonutChartComponent width="100%" height="100%" dataDestinasi={dataDestinasi} />
      </div>
      <div className="h-40 w-full px-2">
        <HorizontalBarChart width="100%" height="100%" dataDestinasi={dataDestinasi} />
      </div>
    </div>
  );
}
