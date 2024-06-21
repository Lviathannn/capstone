import DataTotal from "./DataTotal";
import UserGraph from "./UserGraph";
import DataRute from "./DataRute";
import VideoGraph from "./VideoGraph";
import DestinationGraph from "./DestinationGraph";
import { getDashboard } from "@/services/Dashboard/getDashboard";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function DashboardPage() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const useGetDashboard = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin"],
      queryFn: () => getDashboard(token),
      enabled: !!token,
    });
    return { data, error, isLoading };
  };
  const { data } = useGetDashboard();
  const dashboardData = data?.data;

  return (
    <ProtectedLayout>
      <div className="flex w-full flex-col gap-4 bg-primary-50 p-6">
        <h1 className="text-xl font-bold text-neutral-800">Overview</h1>
        <div className="flex flex-col gap-9 lg:flex-row">
          <div className="flex w-full flex-col gap-6 lg:w-4/6">
            <DataTotal dataTotal={dashboardData?.total_data} />
            <UserGraph dataGraph={dashboardData?.pertumbuhan_pengguna} />
            <DataRute dataRoute={dashboardData?.route_user} />
          </div>
          <div className="flex w-full flex-col gap-8 lg:w-2/6">
            <VideoGraph dataVid={dashboardData?.total_content_vid} />
            <DestinationGraph
              dataDestinasi={dashboardData?.kategori_destinasi}
            />
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
