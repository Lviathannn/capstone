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

export default function MenuUtama() {
  const navigate = useNavigate();

  const usersData = [
    {
      namaPengguna: 'john_doe',
      namaLengkap: 'John Doe',
      email: 'john.doe@example.com',
      noTelpon: '081234567890',
      jenisKelamin: 'Laki-laki',
      kota: 'Jakarta',
      provinsi: 'DKI Jakarta'
    },
    {
      namaPengguna: 'jane_smith',
      namaLengkap: 'Jane Smith',
      email: 'jane.smith@example.com',
      noTelpon: '082345678901',
      jenisKelamin: 'Perempuan',
      kota: 'Bandung',
      provinsi: 'Jawa Barat'
    },
    {
      namaPengguna: 'budi_santoso',
      namaLengkap: 'Budi Santoso',
      email: 'budi.santoso@example.com',
      noTelpon: '083456789012',
      jenisKelamin: 'Laki-laki',
      kota: 'Surabaya',
      provinsi: 'Jawa Timur'
    },
    {
      namaPengguna: 'susan_tan',
      namaLengkap: 'Susan Tan',
      email: 'susan.tan@example.com',
      noTelpon: '084567890123',
      jenisKelamin: 'Perempuan',
      kota: 'Medan',
      provinsi: 'Sumatera Utara'
    },
    {
      namaPengguna: 'david_lee',
      namaLengkap: 'David Lee',
      email: 'david.lee@example.com',
      noTelpon: '085678901234',
      jenisKelamin: 'Laki-laki',
      kota: 'Makassar',
      provinsi: 'Sulawesi Selatan'
    },
    {
      namaPengguna: 'lisa_black',
      namaLengkap: 'Lisa Black',
      email: 'lisa.black@example.com',
      noTelpon: '086789012345',
      jenisKelamin: 'Perempuan',
      kota: 'Yogyakarta',
      provinsi: 'DI Yogyakarta'
    },
    {
      namaPengguna: 'michael_jordan',
      namaLengkap: 'Michael Jordan',
      email: 'michael.jordan@example.com',
      noTelpon: '087890123456',
      jenisKelamin: 'Laki-laki',
      kota: 'Semarang',
      provinsi: 'Jawa Tengah'
    },
    {
      namaPengguna: 'angela_white',
      namaLengkap: 'Angela White',
      email: 'angela.white@example.com',
      noTelpon: '088901234567',
      jenisKelamin: 'Perempuan',
      kota: 'Palembang',
      provinsi: 'Sumatera Selatan'
    },
    {
      namaPengguna: 'robert_brown',
      namaLengkap: 'Robert Brown',
      email: 'robert.brown@example.com',
      noTelpon: '089012345678',
      jenisKelamin: 'Laki-laki',
      kota: 'Balikpapan',
      provinsi: 'Kalimantan Timur'
    },
    {
      namaPengguna: 'samantha_green',
      namaLengkap: 'Samantha Green',
      email: 'samantha.green@example.com',
      noTelpon: '080123456789',
      jenisKelamin: 'Perempuan',
      kota: 'Denpasar',
      provinsi: 'Bali'
    }
  ];

  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUserDetailClick = (user) => {
    navigate(`/manage-user/detail`, { state: { user } });
  };
  
  const handleUserClick = (user) => {
    navigate(`/manage-user/edit`, { state: { user } });
  };

  const handleDeleteUser = (userToDelete) => {
    const updatedUsers = users.filter(user => user !== userToDelete);
    setUsers(updatedUsers);
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
                <p className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">{users.length}</p>
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
                  {currentUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.namaPengguna}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.namaLengkap}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.email}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.noTelpon}</TableCell>
                      <TableCell onClick={() => handleUserDetailClick(user)} style={{ cursor: 'pointer' }}>{user.jenisKelamin}</TableCell>
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
