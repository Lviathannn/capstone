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

export const TableAdmin = () => {
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
                {DataAdmin.map((item) => (
                  <TableRow
                    className="font-jakarta-sans w-full text-sm font-normal text-neutral-800"
                    key={item.id}
                  >
                    <TableCell className="w-[459px]">{item.username}</TableCell>
                    <TableCell className="w-[459px]">{item.date}</TableCell>
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
    )
}