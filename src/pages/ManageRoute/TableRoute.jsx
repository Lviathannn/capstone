import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";
import IcDelete from "@/components/icons/ic-delete.svg";
import IlusDelete from "@/assets/ImgModal/Ilustrasi-delete.svg";

export const TableRoute = ({
  filteredData,
  handleRouteClick,
  handleDeletedById,
  openNotif,
}) => {
  return (
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
          <TableHead className="text-center font-jakarta-sans text-neutral-50">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-neutral-50 font-jakarta-sans">
        {filteredData?.map((route, index) => {
          const fullDestinations = route?.destinasi || [];
          const destinations = Array.from({ length: 3 }, (_, i) => fullDestinations[i]?.nama_destinasi || "-");
          
          return (
            <TableRow
              key={index}
              onClick={() => handleRouteClick(route)}
              className="cursor-pointer"
            >
              <TableCell>{route.username}</TableCell>
              <TableCell>{route.kota}</TableCell>
              {destinations.map((destinasi, index) => (
                <TableCell key={index}>{destinasi}</TableCell>
              ))}
              <TableCell>{route.estimasi_biaya}</TableCell>
              <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                <AlertConfirm
                  backround="outline-none bg-transparent border-none rounded-0 w-fit h-fit p-0 hover:bg-transparent"
                  textBtn={<img src={IcDelete} sizes="24" alt="" />}
                  img={IlusDelete}
                  title="Hapus Data !"
                  desc="Anda akan menghapus data ini. Tindakan ini tidak dapat
        dibatalkan. Apakah Anda yakin ingin menghapus data ini?"
                  textDialogCancel="Batal"
                  textDialogSubmit="Hapus"
                  bgBtn={true}
                  onConfirm={() => handleDeletedById(route.id)}
                  openNotif={openNotif}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
