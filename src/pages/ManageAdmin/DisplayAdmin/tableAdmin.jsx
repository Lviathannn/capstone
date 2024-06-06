import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataAdmin } from "@/constant/DataAdmin";
import IcEdit from "@/components/icons/ic-edit.svg";
import IcDelete from "@/components/icons/ic-delete.svg";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getUsers } from "@/services/manageAdmin/getUsers";

export const useGetAdmin = () => {
  const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
  console.log('Token:', token); 
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: () => getUsers(token),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error); 
    },
  });
  console.log("Fetched data:", data); // Logging untuk debug
  return { data, error, isLoading };
};

export const TableAdmin = () => {
  const { data, error, isLoading } = useGetAdmin();

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
          {data&& data.map((item) => (
            <TableRow
              className="font-jakarta-sans w-full text-sm font-normal text-neutral-800"
              key={item.id}
            >
              <TableCell className="w-[459px]">{item.username}</TableCell>
              {/*<TableCell className="w-[459px]">{item.date}</TableCell>*/}
              <TableCell className="flex w-full items-center justify-center gap-7 px-0">
                <div>
                  <img src={IcEdit} sizes="24" alt="" />
                </div>
                <div>
                  <img src={IcDelete} sizes="24" alt="" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
