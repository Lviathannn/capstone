import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import content from "@/assets/icons/content.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";
import notFoundImg from "@/assets/icons/not-found.svg";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";
import AlertDelete from "@/assets/img/alert delete.png";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContent } from "@/services/manageContent/getContent";
import { deleteContent } from "@/services/manageContent/deleteContent";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";
import Pagination from "@/components/features/Pagination"

export const useGetContent = (page, searchQuery) => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", page, searchQuery],
    queryFn: () => getContent(token, page, searchQuery),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

export default function LandingContent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const { data, error, isLoading } = useGetContent(currentPage, debouncedSearchQuery);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const token = useSelector((state) => state.auth.user?.access_token);

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteContent(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["content", currentPage]);
      console.log("Content deleted successfully");
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  const handleDeleteContent = (content) => {
    const contentId = content.id;
    createDeletedMutation.mutate(contentId);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const contents = data?.data || [];
  const totalContents = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.last_page || 1;

  const filteredContents = contents.filter(content => {
    const name = content.destination?.name || "";
    const title = content.title || "";
    const url = content.url || "";
    return (
      name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      url.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }).slice(0, 8);

  const handleDetailClick = (content) => {
    const { id } = content;
    navigate(privateRoutes.CONTENT + `/detail/${id}`);
  };

  const handleEditClick = (content) => {
    const { id } = content;
    navigate(privateRoutes.CONTENT + `/edit/${id}`);
  };

  return (
    <ProtectedLayout>
      <main className="flex">
        <div className="flex w-full h-screen flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-10 bg-neutral-50 p-4 shadow-md rounded-lg">
              <h1 className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">Kelola Konten</h1>
              <p className="text-[16px] font-[500] text-neutral-700 font-jakarta-sans">Kelola data konten dengan mudah!</p>
              <div className="flex justify-between mt-4">
                <div className="flex items-center border rounded-lg px-4 py-3 w-1/2">
                  <img src={search} alt="Search Icon" className="w-4 h-4 mr-4" />
                  <input
                    type="text"
                    placeholder="Cari data konten ..."
                    className="w-full border-none outline-none bg-transparent font-jakarta-sans text-neutral-800"
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
                <Link to={`${privateRoutes.CONTENT}/create`} className="flex items-center border px-4 py-3 text-primary-500 rounded-lg font-jakarta-sans">
                  <img src={plus} alt="Plus Icon" className="w-6 h-6 mr-4" />
                  Tambah Konten
                </Link>
              </div>
            </div>
            <div className="col-span-2 bg-neutral-50 p-4 flex flex-col items-left justify-center rounded-lg shadow-md">
              <img src={content} alt="Person Icon" className="w-6 h-6 mb-4" />
              <p className="text-[26px] font-[700] text-neutral-800 font-jakarta-sans">{totalContents}</p>
              <p className="text-[16px] font-[400] text-neutral-800 font-jakarta-sans">Total Konten</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            {filteredContents.length === 0 ? (
              <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-5">
                <img className="h-[200px] w-[200px]" src={notFoundImg} alt="Not Found" />
                <span className="mx-auto flex items-center text-[16px] font-medium">
                  Maaf, Hasil Pencarian Tidak Ditemukan!
                </span>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader className="bg-primary-500 text-sm font-semibold">
                    <TableRow>
                      <TableHead className="text-neutral-50 font-jakarta-sans">Nama Destinasi</TableHead>
                      <TableHead className="text-neutral-50 font-jakarta-sans">Deskripsi Konten</TableHead>
                      <TableHead className="text-neutral-50 font-jakarta-sans">Link Terkait</TableHead>
                      <TableHead className="text-neutral-50 font-jakarta-sans">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-neutral-50 font-jakarta-sans">
                    {filteredContents.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell onClick={() => handleDetailClick(content)} className="max-w-xs truncate overflow-hidden whitespace-nowrap cursor-pointer">
                          {content.destination?.name}
                        </TableCell>
                        <TableCell onClick={() => handleDetailClick(content)} className="max-w-xs truncate overflow-hidden whitespace-nowrap cursor-pointer">{content.title}</TableCell>
                        <TableCell onClick={() => handleDetailClick(content)} className="max-w-xs truncate overflow-hidden whitespace-nowrap cursor-pointer">{content.url}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <button
                              className="mr-2"
                              onClick={() => handleEditClick(content)}
                            >
                              <img src={edit} alt="Edit Icon" className="h-6 w-6" />
                            </button>
                          <AlertConfirm
                            backround="outline-none bg-transparent border-none rounded-0 w-fit h-fit p-0 hover:bg-transparent"
                            textBtn={
                              <img src={deleteIcon} className="h-6 w-6" alt="" />
                            }
                            img={AlertDelete}
                            title="Hapus Data !"
                            desc="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
                            textDialogCancel="Batal"
                            textDialogSubmit="Hapus"
                            bgBtn="True"
                            successOpen={openSuccess}
                            setSuccessOpen={setOpenSuccess}
                            errorOpen={openError}
                            setErrorOpen={setOpenError}
                            onConfirm={() => handleDeleteContent(content)}
                          ></AlertConfirm>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination currentPage={currentPage} lastPage={totalPages} />
              </>
            )}
          </div>
        </div>
      </main>
    </ProtectedLayout>
  );
}