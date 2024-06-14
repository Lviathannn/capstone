import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "@/assets/icons/person.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import AlertDelete from "@/assets/img/alert delete.png";

import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers } from '@/services/manageUser/getUsers';
import { deleteUsers } from '@/services/manageUser/deleteUsers';

export const useGetUser = (page) => {
  const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", page],
    queryFn: () => getUsers(token, page),
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
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetUser(currentPage);

  // Menambahkan token ke dalam variabel lokal
  const token = useSelector((state) => state.auth.user?.access_token);

  const createDeletedMutation = useMutation({
    // Mengakses token di dalam fungsi createDeletedMutation
    mutationFn: (id) => deleteUsers(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", currentPage]);
      console.log("User deleted successfully");
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });
  
  const handleDeleteUser = (user) => {
    const userId = user.id;
    createDeletedMutation.mutate(userId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const users = data?.data || [];
  const totalUsers = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.last_page || 1;
  const usersPerPage = data?.pagination?.per_page || 10;

  const handleUserDetailClick = (user) => {
    const {id} = user;
    navigate(`/manage-user/detail`, { state: { id } });
  };
  
  const handleUserClick = (user) => {
    const {id} = user;
    navigate(`/manage-user/edit`, { state: { id} });
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex">
          <div className="flex w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-10 bg-neutral-50 p-4 rounded-lg">
                <h1 className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">Kelola User</h1>
                <p className="text-[16px] font-[500] text-neutral-700 font-jakarta-sans">Kelola data pengguna dengan mudah!</p>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center border rounded-lg px-4 py-3 w-1/2">
                    <img src={search} alt="Search Icon" className="w-4 h-4 mr-4" />
                    <input 
                      type="text" 
                      placeholder="Cari ..." 
                      className="w-full border-none outline-none bg-transparent font-jakarta-sans text-neutral-800" 
                    />
                  </div>
                  <Link to="/manage-user/create" className="flex items-center border px-4 py-3 text-primary-500 rounded-lg font-jakarta-sans">
                    <img src={plus} alt="Plus Icon" className="w-6 h-6 mr-4" />
                    Tambah ...
                  </Link>
                </div>
              </div>
              <div className="col-span-2 bg-neutral-50 p-4 flex flex-col items-left justify-center rounded-lg">
                <img src={person} alt="Person Icon" className="w-6 h-6 mb-4" />
                <p className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">{totalUsers}</p>
                <p className="text-[16px] font-[400] text-neutral-800 font-jakarta-sans">Total User</p>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-primary-500 text-sm font-semibold">
                  <TableRow>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Nama Pengguna</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Nama Lengkap</TableHead>
                                      <TableHead className="text-neutral-50 font-jakarta-sans">Email</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Nomor Telepon</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Jenis Kelamin</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Kota</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Provinsi</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-neutral-50 font-jakarta-sans">
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.username}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.nama_lengkap}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.email}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.no_telepon}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.jenis_kelamin}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.kota}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.provinsi}</TableCell>
                      <TableCell>
                        <button className="mr-2" onClick={() => handleUserClick(user)}>
                          <img src={edit} alt="Edit Icon" className="w-6 h-6" />
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <img src={deleteIcon} alt="Delete Icon" className="w-6 h-6" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader className="pb-6">
                              <div className="flex justify-center pb-6">
                                <img src={AlertDelete} alt="Alert Add" className="w-[240px] h-[100px]" />
                              </div>
                              <AlertDialogTitle className="text-lg font-bold text-neutral-900 font-jakarta-sans text-center pb-4">Hapus User?</AlertDialogTitle>
                              <AlertDialogDescription className="text-sm font-medium text-neutral-600 font-jakarta-sans text-center">
                                Anda akan menghapus data ini. Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus data ini?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex justify-center w-full">
                              <AlertDialogCancel className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-danger-500 hover:text-neutral-50 hover:border-none mx-2 w-full text-center">Batal</AlertDialogCancel>
                              <AlertDialogAction className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-danger-500 hover:text-neutral-50 hover:border-none mx-2 w-full text-center" onClick={() => handleDeleteUser(user)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center my-3">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-neutral-50 rounded-lg shadow-sm ${currentPage === 1 ? 'text-neutral-400' : 'text-primary-500'}`}
              >
                &lt;
              </button>
              <span className="px-20 py-2 font-jakarta-sans text-sm font-bold text-neutral-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-neutral-50 rounded-lg shadow-sm ${currentPage === totalPages ? 'text-neutral-400' : 'text-primary-500'}`}
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
