import { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "@/assets/icons/person.png";
import search from "@/assets/icons/search.png";
import IcDelete from "@/components/icons/ic-delete.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { useSelector } from "react-redux";
import { getRoutes } from "@/services/ManageRoute/getRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import IlusDelete from "@/assets/ImgModal/Ilustrasi-delete.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";
import { deleteRoutes } from "@/services/ManageRoute/deleteRoute";

export default function ManageRoute() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const useGetAdmin = (page) => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin", page],
      queryFn: () => getRoutes(token, page),
      enabled: !!token,
      onError: (error) => {
        console.error("Query error:", error);
      },
    });
    return { data, error, isLoading };
  };
  
  const { data, error, isLoading } = useGetAdmin(currentPage);
  const totalPages = data?.pagination?.last_page;
  const [searchTerm, setSearchTerm] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = data?.data?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteRoutes(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", currentPage] });
      setOpenSuccess(true);
    },
    onError: (error) => {
      setOpenError(true);
      console.error("Delete error:", error);
    },
  });

  const handleRouteClick = (user) => {
    navigate(`/manage-route/${user.id}`);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDeletedById = (id) => {
    createDeletedMutation.mutate(id);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex">
          <div className="flex w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-10 rounded-lg bg-neutral-50 p-4">
                <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
                  Kelola User Rute
                </h1>
                <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
                  Kelola data rute dengan mudah
                </p>
                <div className="mt-4 flex justify-between">
                  <div className="flex w-1/2 items-center rounded-lg border px-4 py-3">
                    <img
                      src={search}
                      alt="Search Icon"
                      className="mr-4 h-4 w-4"
                    />
                    <input
                      type="text"
                      placeholder="Cari ..."
                      className="w-full border-none bg-transparent font-jakarta-sans text-neutral-800 outline-none"
                      onChange={handleSearchChange}
                      value={searchTerm}
                    />
                  </div>
                </div>
              </div>
              <div className="items-left col-span-2 flex flex-col justify-center rounded-lg bg-neutral-50 p-4">
                <img src={person} alt="Person Icon" className="mb-4 h-6 w-6" />
                <p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
                  {filteredData?.length}
                </p>
                <p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
                  Total Rute
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <Table>
                <TableHeader className="bg-primary-500 text-sm font-semibold">
                  <TableRow>
                    <TableHead className="text-center font-jakarta-sans text-neutral-50">
                      Nama Pengguna
                    </TableHead>
                    <TableHead className="text-center font-jakarta-sans text-neutral-50">
                      Kota
                    </TableHead>
                    <TableHead className="text-center font-jakarta-sans text-neutral-50">
                      Destinasi 1
                    </TableHead>
                    <TableHead className="text-center font-jakarta-sans text-neutral-50">
                      Destinasi 2
                    </TableHead>
                    <TableHead className="text-center font-jakarta-sans text-neutral-50">
                      Destinasi 3
                    </TableHead>
                    <TableHead className="text-center font-jakarta-sans text-neutral-50">
                      Estimasi Biaya
                    </TableHead>
                    <TableHead className="text-center font-jakarta-sans  text-neutral-50">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-neutral-50 font-jakarta-sans">
                  {filteredData?.map((route, index) => {
                    const fullDestinations = [...(route?.destinasi || [])];
                    while (fullDestinations.length < 3) {
                      fullDestinations.push({ nama_destinasi: "-" });
                    }
                    return (
                      <TableRow key={index}>
                        <TableCell
                          onClick={() => handleRouteClick(route)}
                          className="cursor-pointer"
                        >
                          {route.username}
                        </TableCell>
                        <TableCell>{route.kota}</TableCell>
                        {fullDestinations.map((destinasi, index) => (
                          <TableCell key={index}>
                            {destinasi.nama_destinasi}
                          </TableCell>
                        ))}
                        <TableCell>{route.estimasi_biaya}</TableCell>
                        <TableCell className="text-center">
                          <AlertConfirm
                            textBtn={
                              <img
                                src={IcDelete}
                                sizes="24"
                                alt=""
                                className="border-none"
                              />
                            }
                            img={IlusDelete}
                            title="Hapus Admin?"
                            desc="Anda akan menghapus admin ini. Tindakan ini tidak dapat
        dibatalkan. Apakah Anda yakin ingin menghapus data ini?"
                            textDialogCancel="Batal"
                            textDialogSubmit="Hapus"
                            bgBtn="True"
                            onConfirm={() => handleDeletedById(route.id)}
                            successOpen={openSuccess}
                            setSuccessOpen={setOpenSuccess}
                            errorOpen={openError}
                            setErrorOpen={setOpenError}
                          ></AlertConfirm>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="my-3 flex justify-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm ${
                  currentPage === 1 ? "text-neutral-400" : "text-primary-500"
                }`}
              >
                &lt;
              </button>
              <span className="px-20 py-2 font-jakarta-sans text-sm font-bold text-neutral-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm ${
                  currentPage === totalPages
                    ? "text-neutral-400"
                    : "text-primary-500"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
