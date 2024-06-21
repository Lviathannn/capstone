import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "@/assets/icons/person.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import DeleteImage from "@/assets/ImgModal/Ilustrasi-delete.svg";

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
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetUser(currentPage, searchQuery);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.user?.access_token);

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteUsers(token, id),
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries(["user", currentPage, searchQuery]);
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

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.no_telepon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.jenis_kelamin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.kota.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.provinsi.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserDetailClick = (user) => {
    const { id } = user;
    navigate(privateRoutes.USER + `/detail/${id}`);
  };

  const handleUserClick = (user) => {
    const { id } = user;
    navigate(privateRoutes.USER + `/edit/${id}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchParams({ page: pageNumber });
    }
  };

  return (
    <ProtectedLayout>
      <div className="flex w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-10 rounded-lg bg-neutral-50 p-4">
            <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
              Kelola User
            </h1>
            <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
              Kelola data pengguna dengan mudah!
            </p>
            <div className="mt-4 flex justify-between">
              <div className="flex w-1/2 items-center rounded-lg border px-4 py-3">
                <img src={search} alt="Search Icon" className="mr-4 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari ..."
                  className="h-full w-full border-none bg-transparent font-jakarta-sans text-neutral-800 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 h-4 w-4 text-neutral-800"
                  >
                    &times;
                  </button>
                )}
              </div>
              <Link
                to={privateRoutes.USER + "/create"}
                className="flex items-center rounded-lg border px-10 py-3 font-jakarta-sans text-primary-500 shadow-sm"
              >
                <img src={plus} alt="Plus Icon" className="mr-4 h-6 w-6" />
                Tambah ...
              </Link>
            </div>
          </div>
          <div className="items-left col-span-2 flex flex-col justify-center rounded-lg bg-neutral-50 p-4">
            <img src={person} alt="Person Icon" className="mb-4 h-6 w-6" />
            <p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
              {totalUsers}
            </p>
            <p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
              Total User
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <Table>
            <TableHeader className="bg-primary-500 text-sm font-semibold">
              <TableRow>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Nama Pengguna
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Nama Lengkap
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Email
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Nomor Telepon
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Jenis Kelamin
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Kota
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Provinsi
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-neutral-50 font-jakarta-sans">
              {isLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <TableSkeleton key={index} />
                ))}
              {filteredUsers.map((user) => (
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
                        className="mr-2"
                        onClick={() => handleUserClick(user)}
                      >
                        <img src={edit} alt="Edit Icon" className="h-6 w-6" />
                      </button>
                      <Dialog
                        img={DeleteImage}
                        actionTitle="Hapus"
                        action={() => handleDeleteUser(user)}
                        type="danger"
                        title="Hapus Data !"
                        description="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
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
            currentPage={data?.pagination.current_page}
            lastPage={data?.pagination?.last_page}
            onPageChange={paginate}
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
