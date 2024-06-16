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
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

export default function DataContent() {
  const navigate = useNavigate();

  const users = [
    {
      namaDestinasi: "Danau Toba",
      deskripsiKonten:
        "Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.",
      linkTerkait: "danau.toba@example.com",
    },
    {
      namaDestinasi: "Danau Toba",
      deskripsiKonten:
        "Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.",
      linkTerkait: "danau.toba@example.com",
    },
    {
      namaDestinasi: "Danau Toba",
      deskripsiKonten:
        "Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.",
      linkTerkait: "danau.toba@example.com",
    },
    {
      namaDestinasi: "Danau Toba",
      deskripsiKonten:
        "Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.",
      linkTerkait: "danau.toba@example.com",
    },
    {
      namaDestinasi: "Danau Toba",
      deskripsiKonten:
        "Danau Toba adalah tujuan wisata yang populer, menawarkan pemandangan alam yang spektakuler, budaya yang kaya, dan berbagai aktivitas rekreasi seperti berlayar, berenang, dan mendaki. Ada banyak resor dan penginapan di sekitar danau yang melayani wisatawan domestik maupun internasional.",
      linkTerkait: "danau.toba@example.com",
    },
  ];

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
    navigate(`${privateRoutes.CONTENT}/detail`, { state: { user } });
  };

  const handleEditClick = (event, user) => {
    event.stopPropagation();
    navigate(`${privateRoutes.CONTENT}/edit`, { state: { user } });
  };

  return (
    <ProtectedLayout>
      <div className="flex h-screen w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-10 rounded-lg bg-neutral-50 p-4">
            <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
              Kelola Konten
            </h1>
            <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
              Kelola data konten dengan mudah!
            </p>
            <div className="mt-4 flex justify-between">
              <div className="flex w-1/2 items-center rounded-lg border px-4 py-3">
                <img src={search} alt="Search Icon" className="mr-4 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari data konten ..."
                  className="w-full border-none bg-transparent font-jakarta-sans text-neutral-800 outline-none"
                />
              </div>
              <Link
                to={`${privateRoutes.CONTENT}/create`}
                className="flex items-center rounded-lg border px-4 py-3 font-jakarta-sans text-primary-500"
              >
                <img src={plus} alt="Plus Icon" className="mr-4 h-6 w-6" />
                Tambah Konten
              </Link>
            </div>
          </div>
          <div className="items-left col-span-2 flex flex-col justify-center rounded-lg bg-neutral-50 p-4">
            <img src={content} alt="Person Icon" className="mb-4 h-6 w-6" />
            <p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
              {users.length}
            </p>
            <p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
              Total Konten
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <Table>
            <TableHeader className="bg-primary-500 text-sm font-semibold ">
              <TableRow>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Nama Destinasi
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Deskripsi Konten
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Link Terkait
                </TableHead>
                <TableHead className="font-jakarta-sans text-neutral-50">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-neutral-50 font-jakarta-sans">
              {currentUsers.map((user, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer"
                >
                  <TableCell>{user.namaDestinasi}</TableCell>
                  <TableCell className="max-w-xs overflow-hidden truncate whitespace-nowrap">
                    {user.deskripsiKonten}
                  </TableCell>
                  <TableCell>{user.linkTerkait}</TableCell>
                  <TableCell>
                    <button
                      className="mr-2"
                      onClick={(e) => handleEditClick(e, user)}
                    >
                      <img src={edit} alt="Edit Icon" className="h-6 w-6" />
                    </button>
                    <button>
                      <img
                        src={deleteIcon}
                        alt="Delete Icon"
                        className="h-6 w-6"
                      />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
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
    </ProtectedLayout>
  );
}
