import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Search from "@/components/icons/Search";
import IcAdmin from "@/components/icons/ic-admin.svg";
import IcAdd from "@/components/icons/ic-add.svg";
import { Input } from "@/components/ui/input";
import IcEdit from "@/components/icons/ic-edit.svg";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { deleteAdmins } from "@/services/manageAdmin/deleteAdmins";
import { Clear } from "@/components/icons/Clear";
import { privateRoutes } from "@/constant/routes";
import { getAllAdmins } from "@/services/manageAdmin/getAllAdmins";
import Dialog from "@/components/features/alert/Dialog";
import TrashCan from "@/components/icons/TrachCan";
import Notification from "@/components/features/alert/Notification";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/features/Pagination";
import { NotFound } from "./NotFound";
import Icdelete from "@/assets/ImgModal/Ilustrasi-delete.svg"
import TableSkeleton from "@/components/features/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export const useGetAdmin = (page, searchQuery) => {
  const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin", page, searchQuery],
    queryFn: () => getAllAdmins(token, page, searchQuery),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

export const TableAdmin = () => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [search, setSearch] = useState("");
  const [searchQuery] = useDebounce(search, 1000);

  const { data, error, isLoading } = useGetAdmin(page, searchQuery);
  const totalPages = data?.pagination?.last_page;
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

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

  const createDeletedMutation = useMutation({
    mutationFn: async (id) => {
      deleteAdmins(token, id);
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", page, searchQuery] });
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
    },
    onError: () => {
      setIsError(true);
    },
  });


  const handleDeletedById = (id) => {
    createDeletedMutation.mutate(id);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDetail = (id) => {
    navigate(`${privateRoutes.ADMIN}/detail/${id}`);
  };

  return (
    <section className="px-6 sm:px-10 mx-auto flex h-full flex-col gap-6 py-6 w-full ">
      <section className="grid h-full w-full items-center justify-between gap-4 sm:flex">
        <div className="h-full w-full overflow-hidden rounded-[10px] border-none shadow-md">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className="flex w-full flex-col gap-4 bg-neutral-50"
          >
            <CardHeader className="w-full p-4 pb-2">
              <CardTitle className="text-[26px] w-full font-bold text-neutral-800">
              {isLoading? <Skeleton className="h-6 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:"Kelola Admin"}
              </CardTitle>
              <CardDescription className="text-[16px] font-medium text-neutral-700 w-full">
              {isLoading? <Skeleton className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:"Kelola data admin dengan mudah!"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-4 w-full">
              <div className="grid w-full gap-3 sm:flex sm:items-center sm:gap-3 md:justify-between">
                <div className="relative h-[48px] w-full bg-neutral-50 sm:w-full md:w-[400px]">
                {isLoading? <Skeleton className="absolute left-3 top-2 h-4 w-[24px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:<Search className="absolute left-3 top-3" />}
                {isLoading? <Skeleton className="absolute h-5 ml-12  w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:<Input
                    className="border-solid-1 absolute h-full rounded-[10px] bg-transparent py-6 pl-12 font-jakarta-sans text-sm font-normal text-neutral-700"
                    type="text"
                    placeholder="Cari berdasarkan username"
                    onChange={handleSearchChange}
                    autoComplete="off"
                    ref={inputRef}
                    name="search"
                  />
                }
                  {search && (
                    <Clear
                      className="absolute right-3 top-3 opacity-50"
                      onClick={handleClear}
                    />
                  )}
                
                </div>
                <div>
                  <Link to={`${privateRoutes.ADMIN}/create`}>
                    <Button className="flex w-full items-center gap-1 overflow-hidden rounded-[12px] border border-neutral-300 bg-transparent px-10 py-6 text-primary-500 shadow-sm hover:bg-neutral-100 sm:w-fit md:gap-4">
                    {isLoading? <Skeleton className="h-4 w-[24px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:<img src={IcAdd} sizes="24" alt="" />}
                    {isLoading? <Skeleton className="h-4 w-[100px] rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:<span>Tambah Admin</span>}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-full overflow-hidden rounded-[10px] border-none shadow-md sm:w-[218px] ">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className="flex py-4 w-full flex-col gap-2 bg-neutral-50"
          >
            <CardHeader className="p-4">
              <CardDescription>
              {isLoading? <Skeleton className="h-4 w-[40px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:<img src={IcAdmin} sizes="24" alt="" />}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-4">
              <CardTitle className="text-2xl font-semibold text-neutral-900">
              {isLoading? <Skeleton className="h-6 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:data?.pagination?.total}
              </CardTitle>
              <div className="text-[16px] font-normal text-muted-foreground text-neutral-900 sm:text-[14px] lg:text-[16px]">
                {isLoading? <Skeleton className="h-4 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />:"Total Admin"}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {data?.data && data?.data?.length === 0 ? (
        <NotFound />
      ) : (
        <section className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl bg-neutral-50 shadow-md">
            <Table className="w-full">
              <TableHeader className="bg-primary-500 font-jakarta-sans text-sm font-semibold text-neutral-50 sm:w-full">
                <TableRow className="text-neutral-50 sm:max-w-full">
                  <TableHead className="w-fit text-neutral-50 sm:w-[459px] ">
                    {isLoading ? (
                      <Skeleton className="h-4 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                    ) : (
                      "Username"
                    )}
                  </TableHead>
                  <TableHead className="w-fit text-neutral-50 sm:w-[459px] ">
                    {isLoading ? (
                      <Skeleton className="h-4 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                    ) : (
                      "Tanggal Pembuatan"
                    )}
                  </TableHead>
                  <TableHead className="w-fit text-center text-neutral-50 sm:w-[200px] ">
                    {isLoading ? (
                      <Skeleton className="h-4 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                    ) : (
                      "Aksi"
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 8 }).map((_, index) => (
                    <TableSkeleton key={index} tableCell={3} />
                  ))}
                {data?.data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="w-full font-jakarta-sans text-sm font-normal text-neutral-800"
                  >
                    <TableCell
                      className="w-fit sm:w-[459px]"
                      onClick={(e) => {
                        handleDetail(item.id);
                      }}
                    >
                      {item.username}
                    </TableCell>
                    <TableCell className="w-fit sm:w-[459px]">
                      {item.tanggal_pembuatan}
                    </TableCell>
                    <TableCell className="flex w-fit items-center justify-center gap-2 px-0 sm:w-full sm:gap-7">
                      <div>
                        <Link to={`${privateRoutes.ADMIN}/edit/${item.id}`}>
                          <img src={IcEdit} sizes="24" alt="" />
                        </Link>
                      </div>
                      <div>
                        <Dialog
                          action={() => handleDeletedById(item?.id)}
                          type="danger"
                          title="Hapus Admin !"
                          img={Icdelete}
                          description="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
                          textSubmit="Hapus"
                          textCancel="Batal"
                        >
                          <button>
                            <TrashCan />
                          </button>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={data?.pagination?.current_page}
            lastPage={data?.pagination?.last_page}
          />
        </section>
      )}
      <Notification
        title={isSuccess ? "Sukses !" : "Gagal !"}
        description={
          isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
        }
        open={isSuccess || isError}
        type={isSuccess ? "success" : "error"}
      />
    </section>
  );
};