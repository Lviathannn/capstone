import PieChartComponent from "@/components/features/PieChart";
import { data } from "autoprefixer";

export default function VideoGraph({dataVid}) {
  return (
    <div className="flex flex-col rounded-xl border border-primary-300 bg-neutral-50 p-4">
      <h1 className="text-lg font-bold text-neutral-800">Total Konten Video</h1>
      <div className="flex flex-col-reverse lg:flex-row w-full items-center">
        <div className="flex w-full lg:w-3/5 flex-col gap-[15px]">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-primary-500" />
            <p className=" text-sm font-medium text-neutral-900">
              <span className="font-bold">{dataVid?.total_content} </span>
              Total Video
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-primary-100" />
            <p className=" text-sm font-medium text-neutral-900">
              <span className="font-bold">{dataVid?.total_destinasi} </span>
              Total Destinasi
            </p>
          </div>
        </div>
        <div className="w-full h-[200px] lg:h-[110px] lg:w-2/5 flex justify-center">
          <PieChartComponent width="100%" height="100%" dataVid={dataVid} />
        </div>
      </div>
    </div>
  );
}
