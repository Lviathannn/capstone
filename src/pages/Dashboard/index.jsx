import DataTotal from "./DataTotal";
import UserGraph from "./UserGraph";
import DataRute from "./DataRute";
import VideoGraph from "./VideoGraph";
import DestinationGraph from "./DestinationGraph";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { getDashboard } from "@/services/Dashboard/getDashboard";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const useGetDashboard = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin"],
      queryFn: () => getDashboard(token),
      enabled: !!token,
      onError: (error) => {
        console.error("Query error:", error);
      },
    });
    return { data, error, isLoading };
  };
  const { data, error, isLoading } = useGetDashboard();
  const dashboardData = data?.data;
  console.log(dashboardData);

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
                <DataTotal dataTotal={dashboardData?.total_data} />
                <UserGraph dataGraph={dashboardData?.pertumbuhan_pengguna} />
                {/* <iframe
                  width="600"
                  height="800"
                  src="https://lookerstudio.google.com/embed/reporting/80dc46e8-cf01-4a11-93df-656a53f413c7/page/1M"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                ></iframe> */}
                <DataRute dataRoute={dashboardData?.route_user} />
              </div>
              <div className="flex w-full flex-col gap-8 lg:w-2/6">
                <VideoGraph dataVid={dashboardData?.total_content_vid} />
                <DestinationGraph dataDestinasi={dashboardData?.kategori_destinasi} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
