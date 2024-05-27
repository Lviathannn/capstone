import AreaChartComponents from "@/components/AreaChart";
import { PeopleAltIcon, PersonIcon, AltRouteIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PieChartComponents from "@/components/PieChart";

export default function DashboardPage() {
  const rutes = [
    {
      id: "AAA001",
      username: "user01",
      start: "titik A",
      finish: "titik B",
      duration: "2 (dua)",
    },
    {
      id: "AAA002",
      username: "user02",
      start: "titik C",
      finish: "titik D",
      duration: "5 (lima)",
    },
    {
      id: "AAA003",
      username: "user03",
      start: "titik E",
      finish: "titik F",
      duration: "4 (empat)",
    },
    {
      id: "AAA004",
      username: "user04",
      start: "titik G",
      finish: "titik H",
      duration: "1 (satu)",
    },
    {
      id: "AAA005",
      username: "user05",
      start: "titik I",
      finish: "titik J",
      duration: "3 (tiga)",
    },
  ];
  return (
    <div className="flex">
      <div className="w-[240px]">side nav</div>

      <div className="flex w-full flex-col gap-4 bg-primary-50 p-6 font-sans">
        <h1 className="text-xl font-bold text-neutral-800">Overview</h1>
        <div className="flex gap-10">
          <div className="flex w-4/6 flex-col gap-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4">
                <PeopleAltIcon />
                <div className="text-neutral-100">
                  <h1 className="text-2xl font-semibold">10</h1>
                  <p>Total Admin</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-[10px] border border-primary-500 bg-neutral-50 p-4">
                <PersonIcon />
                <div className="text-primary-700">
                  <h1 className="text-2xl font-semibold">894</h1>
                  <p>Total Pengguna</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4">
                <AltRouteIcon />
                <div className="text-neutral-100">
                  <h1 className="text-2xl font-semibold">1005</h1>
                  <p>Total Rute</p>
                </div>
              </div>
            </div>
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
              <AreaChartComponents width="100%" height={250} />
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-primary-300 bg-neutral-50 p-4">
              <h1 className="text-lg font-bold text-neutral-800">
                Data Rute Pengguna
              </h1>
              <Table className="border border-neutral-200">
                <TableHeader className="!rounded-[12px] bg-primary-500 text-sm font-semibold text-neutral-50">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-center">Username</TableHead>
                    <TableHead className="text-center">Titik Awal</TableHead>
                    <TableHead className="text-center">Titik Akhir</TableHead>
                    <TableHead className="text-center">Durasi (hari)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rutes.map((rute) => (
                    <TableRow
                      key={rute.id}
                      className="border-t border-neutral-700 text-sm font-normal text-neutral-800"
                    >
                      <TableCell>{rute.id}</TableCell>
                      <TableCell>{rute.username}</TableCell>
                      <TableCell>{rute.start}</TableCell>
                      <TableCell>{rute.finish}</TableCell>
                      <TableCell>{rute.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="w-2/6">
            <div className="flex flex-col rounded-xl border border-primary-300 bg-neutral-50 p-4">
              <h1 className="text-lg font-bold text-neutral-800">
                Total Konten Video
              </h1>
              <div className="flex w-full items-center">
                <div className="flex w-3/5 flex-col gap-[15px]">
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-primary-500" />
                    <p className=" text-sm font-medium text-neutral-900">
                      <span className="font-bold">35 </span>
                      Total Pengguna
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-primary-100" />
                    <p className=" text-sm font-medium text-neutral-900">
                      <span className="font-bold">65 </span>
                      Total Destinasi
                    </p>
                  </div>
                </div>
                <div className="w-2/5">
                  <PieChartComponents width={160} height={110} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
