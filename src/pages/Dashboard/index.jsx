import DataTotal from "./DataTotal";
import UserGraph from "./UserGraph";
import DataRute from "./DataRute";
import VideoGraph from "./VideoGraph";
import DestinationGraph from "./DestinationGraph";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";

export default function DashboardPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex">
          <div className="flex w-full flex-col gap-4 bg-primary-50 p-6">
            <h1 className="text-xl font-bold text-neutral-800">Overview</h1>
            <div className="flex flex-col gap-9 lg:flex-row">
              <div className="flex w-full flex-col gap-6 lg:w-4/6">
                <DataTotal />
                <UserGraph />
                <DataRute />
              </div>
              <div className="flex w-full flex-col gap-8 lg:w-2/6">
                <VideoGraph />
                <DestinationGraph />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
