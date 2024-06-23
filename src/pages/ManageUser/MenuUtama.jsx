import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "@/assets/icons/person.png";
import plus from "@/assets/icons/plus.png";
import { Clear } from "@/components/icons/Clear";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/services/manageUser/getUsers";
import { deleteUsers } from "@/services/manageUser/deleteUsers";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";
import Pagination from "@/components/features/Pagination";
import { useSearchParams } from "react-router-dom";
import TableSkeleton from "@/components/features/skeleton/TableSkeleton";
import Dialog from "@/components/features/alert/Dialog";
import Notification from "@/components/features/alert/Notification";
import TrashCan from "@/components/icons/TrachCan";
import IcEdit from "@/components/icons/ic-edit.svg";
import IcDelete from "@/assets/ImgModal/Ilustrasi-delete.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";
import IcSearch from "@/assets/icons/search.png";

export const useGetUser = (page, searchQuery) => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", page, searchQuery],
    queryFn: () => getUsers(token, page, searchQuery),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

export default function MenuUtama() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [search, setSearch] = useState("");
  const [searchQuery] = useDebounce(search, 1000);
  const { data, error, isLoading } = useGetUser(page, searchQuery);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);
  const token = useSelector((state) => state.auth.user?.access_token);

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteUsers(token, id),
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries(["user", page, searchQuery]);
    },
    onError: () => {
      setIsError(true);
    },
    onSettled: () => {
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
    },
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

  const handleDeleteUser = (user) => {
    const userId = user.id;
    createDeletedMutation.mutate(userId);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const users = data?.data || [];
  const totalUsers = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.last_page || 1;

  const handleUserDetailClick = (user) => {
    const { id } = user;
    navigate(privateRoutes.USER + `/detail/${id}`);
  };

  const handleUserClick = (user) => {
    const { id } = user;
    navigate(privateRoutes.USER + `/edit/${id}`);
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

  return (
    <ProtectedLayout>
      <div className="flex w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
        <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10 rounded-lg bg-neutral-50 p-4">
          <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
            {isLoading ? (
              <Skeleton className="h-5 w-full bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
            ) : (
              "Kelola User"
            )}
          </h1>
          <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
            {isLoading ? (
              <Skeleton className="h-3 w-full bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
            ) : (
              "Kelola data pengguna dengan mudah!"
            )}
          </p>
          <div className="mt-4 flex justify-between">
            <div className="flex w-1/2 items-center rounded-lg border px-4 py-3 relative">
              {isLoading ? (
                <Skeleton className="h-5 w-5 bg-gradient-to-r rounded-full from-neutral-200 to-neutral-50/0 mr-2" />
              ) : (
                <img src={IcSearch} alt="Search Icon" className="mr-4 h-4 w-4" />
              )}
              {isLoading ? (
                <Skeleton className="h-5 w-full bg-gradient-to-r rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <input
                  type="text"
                  placeholder="Cari ..."
                  className="h-full w-full border-none bg-transparent font-jakarta-sans text-neutral-800 outline-none"
                  ref={inputRef}
                  name="search"
                  onChange={handleSearchChange}
                />
              )}
              {search && (
                <Clear
                  className="absolute right-3 top-3 opacity-50"
                  onClick={handleClear}
                />
              )}
            </div>
            <Link
              to={privateRoutes.USER + "/create"}
              className="flex items-center rounded-lg border px-10 py-3 font-jakarta-sans text-primary-500 shadow-sm"
            >
              {isLoading ? (
                <Skeleton className="h-6 w-6 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 mr-3" />
              ) : (
                <img src={plus} alt="Plus Icon" className="mr-4 h-6 w-6" />
              )}
              {isLoading ? (
                <Skeleton className="h-4 w-16 bg-gradient-to-r rounded-lg from-neutral-200 to-neutral-50/0" />
              ) : (
                <span>Tambah ...</span>
              )}
            </Link>
          </div>
        </div>
          <div className="items-left col-span-2 flex flex-col justify-center rounded-lg bg-neutral-50 p-4">
            {isLoading ? ( <Skeleton className="h-6 w-6 mb-5 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />) :<img src={person} alt="Person Icon" className="mb-4 h-6 w-6" />}
            {isLoading ? ( <Skeleton className="h-6 w-full mb-3 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />) :<p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
              {totalUsers}
            </p>}
            {isLoading ? ( <Skeleton className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />) :<p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
              Total User
            </p>}
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <Table>
            <TableHeader className="bg-primary-500 text-sm font-semibold">
              <TableRow>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Nama Pengguna"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Nama Lengkap"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Email"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Nomor Telepon"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Jenis Kelamin"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Kota"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Provinsi"}
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  {isLoading ? <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" /> : "Aksi"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-neutral-50 font-jakarta-sans">
              {isLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <TableSkeleton key={index} tableCell={8} />
                ))}
              {data?.data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.username}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.nama_lengkap}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.no_telepon}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.jenis_kelamin}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.kota}
                  </TableCell>
                  <TableCell
                    onClick={() => handleUserDetailClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    {user.provinsi}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <button
                        className="mr-4"
                        onClick={() => handleUserClick(user)}
                      >
                        <img src={IcEdit} alt="Edit Icon" sizes="24" />
                      </button>
                      <Dialog
                        img={IcDelete}
                        actionTitle="Hapus"
                        action={() => handleDeleteUser(user)}
                        type="danger"
                        title="Hapus Data !"
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
        <div className="my-3 flex justify-center">
          <Pagination
            currentPage={data?.pagination?.current_page}
            lastPage={data?.pagination?.last_page}
          />
        </div>
      </div>
      <Notification
        title={isSuccess ? "Sukses !" : "Gagal !"}
        description={
          isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
        }
        open={isSuccess || isError}
        type={isSuccess ? "success" : "error"}
      />
    </ProtectedLayout>
  );
}