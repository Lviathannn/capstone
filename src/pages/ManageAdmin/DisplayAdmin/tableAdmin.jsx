import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Search from "@/components/icons/Search";
import IcAdmin from "@/components/icons/ic-admin.svg";
import IcAdd from "@/components/icons/ic-add.svg";

import { Input } from "@/components/ui/input";

import IcEdit from "@/components/icons/ic-edit.svg";
import IcDelete from "@/components/icons/ic-delete.svg";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/services/manageAdmin/getUsers";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IlusDelete from "@/assets/ImgModal/Ilustrasi-delete.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";
import { deleteAdmins } from "@/services/manageAdmin/deleteAdmins";
import { toast } from "sonner";

export const useGetAdmin = (page) => {
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

export const TableAdmin = () => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useGetAdmin(currentPage);
  const totalPages = data?.pagination?.last_page;
  const perPage = data?.pagination?.per_page;
  const [deleted, setDeleted] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  console.log(token);

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteAdmins(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", currentPage] });
      toast.success("User deleted successfully");
      console.log("success bro!");
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  // const handleDeleteId = (id) => {
  //   setDeleted(id);
  // }

  const handleDeletedById = (id) => {
    setDeleted(id);
    
    console.log(`Menghapus admin dengan ID: ${id}`);
    createDeletedMutation.mutate(id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data?.data?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()), 
  );

  const handleDetail = (id) =>{
    navigate(`/detail/${id}`);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No admin data available</div>;
  }

  return (
    <div
      className="bg-primary-50 mt-[80px] rounded-t-2xl sm:ml-[240px]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <section className="container mx-auto flex h-full flex-col gap-5 py-6">
        <div className="flex h-fit items-center justify-between gap-4">
          <div className="h-fit w-full overflow-hidden rounded-[10px] border-none shadow-md">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="flex flex-col gap-4 bg-neutral-50 px-4"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-[26px] font-bold text-neutral-800">
                  Kelola Admin
                </CardTitle>
                <CardDescription className="text-[16px] font-medium text-neutral-700">
                  Kelola data admin dengan mudah!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="relative h-[48px] w-[400px] bg-neutral-50">
                    <Search className="absolute left-3 top-3" />
                    <Input
                      className="border-solid-1 font-jakarta-sans absolute h-full rounded-[10px] bg-transparent py-6 pl-12 text-sm font-normal text-neutral-700"
                      type="text"
                      placeholder="Cari berdasarkan username"
                      onChange={handleSearchChange}
                      required
                    />
                  </div>
                  <div>
                    <Link to="/add">
                      <Button className="text-primary-500 flex items-center gap-4 overflow-hidden rounded-[12px] border border-neutral-300 bg-transparent px-4  py-6 shadow-sm hover:bg-neutral-100">
                        <img src={IcAdd} sizes="24" alt="" />
                        <span>Tambah Admin</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-[218px] overflow-hidden rounded-[10px] border-none shadow-md">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="flex w-full flex-col gap-4 bg-neutral-50 px-4 py-4"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  <img src={IcAdmin} sizes="24" alt="" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-semibold text-neutral-900">
                  {data?.pagination?.total}
                </CardTitle>
                <div className="text-muted-foreground text-[16px] font-normal text-neutral-900">
                  Total Admin
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <section className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl bg-neutral-50 shadow-md">
            <Table className="w-full">
              <TableHeader className="bg-primary-500 font-jakarta-sans text-sm font-semibold text-neutral-50 sm:w-full">
                <TableRow className="text-neutral-50 sm:max-w-full">
                  <TableHead className="w-[459px] text-neutral-50 ">
                    Username
                  </TableHead>
                  <TableHead className="w-[459px] text-neutral-50 ">
                    Tanggal Pembuatan
                  </TableHead>
                  <TableHead className="w-[200px] text-center text-neutral-50 ">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                      <TableRow
                       
                      key={item.id}
                      className="font-jakarta-sans w-full text-sm font-normal text-neutral-800"
                      
                    >
                      <TableCell className="w-[459px]" onClick={(e) => {
                         if (!e.target.closest('AlertConfirm') && !e.target.closest('Link')) {
                          handleDetail(item.id);
                         }
                       }} >
                        {item.username}
                      </TableCell>
                      <TableCell className="w-[459px]">
                        {item.tanggal_pembuatan}
                      </TableCell>
                      <TableCell className="flex w-full items-center justify-center gap-7 px-0">
                        <div>
                          <Link to={`/edit/${item.id}`}>
                            <img src={IcEdit} sizes="24" alt="" />
                          </Link>
                        </div>
                        <div >
                          <AlertConfirm
                            backround="outline-none bg-transparent border-none rounded-0 w-fit h-fit p-0 hover:bg-transparent"
                            textBtn={<img src={IcDelete} sizes="24" alt="" />}
                            img={IlusDelete}
                            title="Hapus Admin?"
                            desc="Anda akan menghapus admin ini. Tindakan ini tidak dapat
        dibatalkan. Apakah Anda yakin ingin menghapus data ini?"
                            textDialogCancel="Batal"
                            textDialogSubmit="Hapus"
                            bgBtn="True"
                            onConfirm={(e) =>handleDeletedById(item.id)}
                          ></AlertConfirm>
                        </div>
                      </TableCell>
                    </TableRow>

                ))}
              </TableBody>
            </Table>
          </div>
          <div className="pagination my-3 flex items-center justify-center">
            <Button
              className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm hover:text-neutral-50 ${currentPage === 1 ? "text-neutral-400" : "text-primary-500"}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <span className="font-jakarta-sans px-20 py-2 text-sm font-bold text-neutral-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm hover:text-neutral-50  ${currentPage === totalPages ? "text-neutral-400" : "text-primary-500"}`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
};
