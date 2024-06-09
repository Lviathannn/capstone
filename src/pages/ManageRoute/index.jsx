import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "@/assets/icons/person.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";
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
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { useSelector } from "react-redux";
import { getUsers } from "@/services/ManageRoute/getRoute";
import { useQuery } from "@tanstack/react-query";


export default function ManageRoute() {
  const useGetAdmin = (page) => {
    const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin", page],
      queryFn: () => getUsers(token, page),
      enabled: !!token,
      onError: (error) => {
        console.error("Query error:", error);
      },
    });
    return { data, error, isLoading };
  };
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAdmin(currentPage);
  const totalPages = data?.pagination?.last_page;
  const [searchTerm, setSearchTerm] = useState("");
  
  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = data?.data?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(filteredData);

  const handleUserClick = (user) => {
    navigate(`/manage-user/detail`, { state: { user } });
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(data);

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
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Nama Pengguna
                    </TableHead>
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Kota
                    </TableHead>
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Destinasi 1
                    </TableHead>
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Destinasi 2
                    </TableHead>
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Destinasi 3
                    </TableHead>
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Estimasi Biaya
                    </TableHead>
                    <TableHead className="font-jakarta-sans text-neutral-50">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-neutral-50 font-jakarta-sans">
                  {filteredData?.map((user, index) => {
                    const fullDestinations = [...(user?.destinasi || [])];
                    while (fullDestinations.length < 3) {
                      fullDestinations.push({ nama_destinasi: "-" });
                    }
                    return (
                      <TableRow
                        key={index}
                        onClick={() => handleUserClick(user)}
                        className="cursor-pointer"
                      >
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.kota}</TableCell>
                        {fullDestinations.map((destinasi, index) => (
                          <TableCell key={index}>
                            {destinasi.nama_destinasi}
                          </TableCell>
                        ))}
                        <TableCell>{user.estimasi_biaya}</TableCell>
                        <TableCell>
                          <button>
                            <img
                              src={deleteIcon}
                              alt="Delete Icon"
                              className="h-6 w-6"
                            />
                          </button>
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
                className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm ${currentPage === 1 ? "text-neutral-400" : "text-primary-500"}`}
              >
                &lt;
              </button>
              <span className="px-20 py-2 font-jakarta-sans text-sm font-bold text-neutral-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm ${currentPage === totalPages ? "text-neutral-400" : "text-primary-500"}`}
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
