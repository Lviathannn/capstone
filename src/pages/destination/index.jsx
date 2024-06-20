import Map from "@/components/icons/Map";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { privateRoutes } from "@/constant/routes";
import { Link } from "react-router-dom";
import Pen from "@/components/icons/Pen";
import TrashCan from "@/components/icons/TrachCan";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllDestination } from "@/services/destination/getAllDestination";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/features/Pagination";

export default function DestinationPage() {
  const token = useSelector((state) => state.auth.user.access_token);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", page],
    queryFn: () => getAllDestination(token, page),
  });

  console.log(destination?.data?.pagination?.current_page);

  return (
    <ProtectedLayout>
      <section
        className="w-full space-y-6 rounded-tl-2xl bg-primary-50 p-6 pb-10"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="grid h-full grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-start-1 w-full space-y-4 rounded-xl bg-white p-4 shadow-md sm:col-end-3 lg:col-end-5">
            <h1 className="text-[26px] font-bold leading-none text-neutral-800">
              Kelola Destinasi
            </h1>
            <p className="font-medium text-neutral-700">
              Kelola data destinasi dengan mudah!
            </p>
            <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
              <Input
                placeholder="Cari destinasi"
                className="md:max-w-[400px]"
              />
              <Link to={privateRoutes.DESTINATION + "/create"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 text-sm font-medium text-primary-500"
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Destinasi
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center space-y-4 rounded-xl bg-white p-4 shadow-md lg:col-start-5 lg:col-end-6">
            <Map />
            <p className="text-xl font-bold text-neutral-800">10</p>
            <p className="text-neutral-800">Total destinasi</p>
          </div>
        </div>
        <div className="max-w-screen overflow-hidden rounded-xl">
          <Table className="rounded-lg">
            <TableHeader className="rounded-lg bg-primary-500">
              <TableRow>
                <TableHead className="min-w-[300px] text-nowrap">
                  Nama
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Kategori
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Provinsi
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Kota / Kabupaten
                </TableHead>
                <TableHead className="min-w-[300px] text-nowrap">
                  Alamat
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Jam Operasional
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Biaya
                </TableHead>
                <TableHead className="min-w-[100px] text-nowrap">
                  Total Konten
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-hidden bg-white">
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {destination?.data?.data?.map((data) => (
                <TableRow key={data?.id}>
                  <TableCell className="text-nowrap">{data?.nama}</TableCell>
                  <TableCell>{data?.kategori?.nama}</TableCell>
                  <TableCell>{data?.alamat?.provinsi}</TableCell>
                  <TableCell>{data?.alamat?.kota}</TableCell>
                  <TableCell>
                    {data?.alamat?.nama_jalan + " " + data?.alamat?.kecamatan}
                  </TableCell>
                  <TableCell>
                    {data?.jam_buka + " - " + data?.jam_tutup}
                  </TableCell>
                  <TableCell>{data?.harga_masuk}</TableCell>
                  <TableCell>{data?.visit_count}</TableCell>
                  <TableCell className="flex items-center justify-center gap-7">
                    <button>
                      <Pen />
                    </button>
                    <button>
                      <TrashCan />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination
          currentPage={destination?.data?.pagination.current_page}
          lastPage={destination?.data?.pagination?.last_page}
        />
      </section>
    </ProtectedLayout>
  );
}
