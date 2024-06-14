import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import content from "@/assets/icons/content.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";
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

export default function DataContent() {
  const navigate = useNavigate();

  const users = [
    {
      namaDestinasi: 'Danau Toba',
      deskripsiKonten: 'Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.',
      linkTerkait: 'danau.toba@example.com',
    },
    {
      namaDestinasi: 'Danau Toba',
      deskripsiKonten: 'Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.',
      linkTerkait: 'danau.toba@example.com',
    },
    {
      namaDestinasi: 'Danau Toba',
      deskripsiKonten: 'Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.',
      linkTerkait: 'danau.toba@example.com',
    },
    {
      namaDestinasi: 'Danau Toba',
      deskripsiKonten: 'Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.',
      linkTerkait: 'danau.toba@example.com',
    },
    {
      namaDestinasi: 'Danau Toba',
      deskripsiKonten: 'Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.',
      linkTerkait: 'danau.toba@example.com',
    }
  ];

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUserClick = (user) => {
    navigate(`/manage-content/detail`, { state: { user } });
  };

  const handleEditClick = (event, user) => {
    event.stopPropagation();
    navigate(`/manage-content/edit`, { state: { user } });
  };  

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex">
          <div className="flex w-full h-screen flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-10 bg-neutral-50 p-4 rounded-lg">
                <h1 className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">Kelola Konten</h1>
                <p className="text-[16px] font-[500] text-neutral-700 font-jakarta-sans">Kelola data konten dengan mudah!</p>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center border rounded-lg px-4 py-3 w-1/2">
                    <img src={search} alt="Search Icon" className="w-4 h-4 mr-4" />
                    <input 
                      type="text" 
                      placeholder="Cari data konten ..." 
                      className="w-full border-none outline-none bg-transparent font-jakarta-sans text-neutral-800" 
                    />
                  </div>
                  <Link to="/manage-content/create" className="flex items-center border px-4 py-3 text-primary-500 rounded-lg font-jakarta-sans">
                    <img src={plus} alt="Plus Icon" className="w-6 h-6 mr-4" />
                    Tambah Konten
                  </Link>
                </div>
              </div>
              <div className="col-span-2 bg-neutral-50 p-4 flex flex-col items-left justify-center rounded-lg">
                <img src={content} alt="Person Icon" className="w-6 h-6 mb-4" />
                <p className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">{users.length}</p>
                <p className="text-[16px] font-[400] text-neutral-800 font-jakarta-sans">Total Konten</p>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-primary-500 text-sm font-semibold ">
                  <TableRow>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Nama Destinasi</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Deskripsi Konten</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Link Terkait</TableHead>
                    <TableHead className="text-neutral-50 font-jakarta-sans">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-neutral-50 font-jakarta-sans">
                  {currentUsers.map((user, index) => (
                    <TableRow key={index} onClick={() => handleUserClick(user)} className="cursor-pointer">
                      <TableCell>{user.namaDestinasi}</TableCell>
                      <TableCell className="max-w-xs truncate overflow-hidden whitespace-nowrap">{user.deskripsiKonten}</TableCell>
                      <TableCell>{user.linkTerkait}</TableCell>
                      <TableCell>
                          <button className="mr-2" onClick={(e) => handleEditClick(e, user)}>
                            <img src={edit} alt="Edit Icon" className="w-6 h-6" />
                          </button>
                          <button>
                            <img src={deleteIcon} alt="Delete Icon" className="w-6 h-6" />
                          </button>
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
