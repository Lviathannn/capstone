import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";
import IcDelete from "@/components/icons/ic-delete.svg";
import IlusDelete from "@/assets/ImgModal/Ilustrasi-delete.svg";

export const TableRoute = ({
  filteredData,
  handleRouteClick,
  handleDeletedById,
  openSuccess,
  setOpenSuccess,
  openError,
  setOpenError,
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
          <TableHead className="text-center font-jakarta-sans  text-neutral-50">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-neutral-50 font-jakarta-sans">
        {filteredData?.map((route, index) => {
          const fullDestinations = [...(route?.destinasi || [])];
          while (fullDestinations.length < 3) {
            fullDestinations.push({ nama_destinasi: "-" });
          }
          return (
            <TableRow key={index}>
              <TableCell
                onClick={() => handleRouteClick(route)}
                className="cursor-pointer"
              >
                {route.username}
              </TableCell>
              <TableCell>{route.kota}</TableCell>
              {fullDestinations.map((destinasi, index) => (
                <TableCell key={index}>{destinasi.nama_destinasi}</TableCell>
              ))}
              <TableCell>{route.estimasi_biaya}</TableCell>
              <TableCell className="text-center">
                <AlertConfirm
                backround="outline-none bg-transparent border-none rounded-0 w-fit h-fit p-0 hover:bg-transparent"
                  textBtn={
                    <img
                      src={IcDelete}
                      sizes="24"
                      alt=""
                    />
                  }
                  img={IlusDelete}
                  title="Hapus Data !"
                  desc="Anda akan menghapus datat ini. Tindakan ini tidak dapat
        dibatalkan. Apakah Anda yakin ingin menghapus data ini?"
                  textDialogCancel="Batal"
                  textDialogSubmit="Hapus"
                  bgBtn={true}
                  onConfirm={() => handleDeletedById(route.id)}
                  successOpen={openSuccess}
                  setSuccessOpen={setOpenSuccess}
                  errorOpen={openError}
                  setErrorOpen={setOpenError}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
