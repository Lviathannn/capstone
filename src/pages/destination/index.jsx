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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDestination } from "@/services/destination/getAllDestination";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/features/Pagination";
import TableSkeleton from "@/components/features/skeleton/TableSkeleton";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import notFoundImg from "@/assets/icons/not-found.svg";
import { useNavigate } from "react-router-dom";
import { deleteDestination } from "@/services/destination/deleteDestionation";
import Dialog from "@/components/features/alert/Dialog";
import Notification from "@/components/features/alert/Notification";
import DeleteImage from "@/assets/ImgModal/Ilustrasi-delete.svg";
import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationPage() {
  const token = useSelector((state) => state.auth.user.access_token);
  const [search, setSearch] = useState("");
  const [searchQuery] = useDebounce(search, 1000);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", page, searchQuery],
    queryFn: () => getAllDestination(token, page, searchQuery),
  });

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [search, setSearchParams]);

  useEffect(() => {
    if (searchQuery !== "") {
      setSearchParams({ page, search: searchQuery });
    } else {
      setSearchParams({ page });
    }
  }, [page, searchQuery, setSearchParams]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const destinationMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await deleteDestination(token, id);
        if (res?.status === 200) {
          return res.data;
        } else {
          throw new Error("Gagal menghapus data");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["destination", page, searchQuery]);
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
    },
  });
  const handleDelete = (id) => {
    destinationMutation.mutate(id);
  };

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
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link to={privateRoutes.DESTINATION + "/create"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full px-10 text-sm font-medium text-primary-500"
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Destinasi
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center space-y-4 rounded-xl bg-white p-4 shadow-md lg:col-start-5 lg:col-end-6">
            <Map />
            {isLoading ? (
              <Skeleton className="h-5 w-20 bg-neutral-200" />
            ) : (
              <p className="text-xl font-bold text-neutral-800">
                {destination?.data?.pagination?.total}
              </p>
            )}
            <p className="text-neutral-800">Total destinasi</p>
          </div>
        </div>
        <div className="max-w-screen overflow-hidden rounded-xl">
          {destination?.data?.data?.length === 0 ? (
            <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-5">
              <img className="h-[200px] w-[200px]" src={notFoundImg} alt="" />
              <span className="mx-auto flex items-center text-[16px] font-medium">
                Maaf, Hasil Pencarian Tidak Ditemukan!
              </span>
            </div>
          ) : (
            <>
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
                  {isLoading &&
                    Array.from({ length: 8 }).map((_, index) => (
                      <TableSkeleton key={index} tableCell={9} />
                    ))}

                  {destination?.data?.data?.map((data) => (
                    <TableRow
                      key={data?.id}
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(
                          privateRoutes.DESTINATION + "/detail/" + data?.id,
                        );
                      }}
                    >
                      <TableCell className="text-nowrap">
                        {data?.nama}
                      </TableCell>
                      <TableCell>{data?.kategori?.nama}</TableCell>
                      <TableCell>{data?.alamat?.provinsi}</TableCell>
                      <TableCell>{data?.alamat?.kota}</TableCell>
                      <TableCell>
                        {data?.alamat?.nama_jalan +
                          " " +
                          data?.alamat?.kecamatan}
                      </TableCell>
                      <TableCell>
                        {data?.jam_buka + " - " + data?.jam_tutup}
                      </TableCell>
                      <TableCell>{data?.harga_masuk}</TableCell>
                      <TableCell>{data?.visit_count}</TableCell>

                      <TableCell
                        className="flex items-center justify-center gap-7"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          to={privateRoutes.DESTINATION + "/edit/" + data?.id}
                        >
                          <button onClick={(e) => e.stopPropagation()}>
                            <Pen />
                          </button>
                        </Link>
                        <Dialog
                          action={() => handleDelete(data?.id)}
                          type="danger"
                          title="Hapus Data !"
                          img={DeleteImage}
                          textSubmit="Hapus"
                          textCancel="Batal"
                          description="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
                        >
                          <button>
                            <TrashCan />
                          </button>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Pagination
                currentPage={destination?.data?.pagination?.current_page}
                lastPage={destination?.data?.pagination?.last_page}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </section>
      {isSuccess && (
        <Notification
          title={"Sukses !"}
          description={"Proses berhasil dilakukan"}
          open={isSuccess}
          type={"success"}
        />
      )}
      {isError && (
        <Notification
          title={"Gagal !"}
          description={"Proses gagal dilakukan"}
          open={isError}
        />
      )}
    </ProtectedLayout>
  );
}
