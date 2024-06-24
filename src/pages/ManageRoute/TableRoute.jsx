import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Dialog from "@/components/features/alert/Dialog";
import TrashCan from "@/components/icons/TrachCan";
import TableSkeleton from "@/components/features/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteImage from "@/assets/ImgModal/Ilustrasi-delete.svg";

export const TableRoute = ({
  filteredData,
  handleRouteClick,
  handleDeletedById,
  isLoading,
}) => {
  return (
    <div>
      <Table>
        <TableHeader className="bg-primary-500 text-sm font-semibold">
          <TableRow>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Nama Pengguna"
              )}
            </TableHead>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Kota"
              )}
            </TableHead>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Destinasi 1"
              )}
            </TableHead>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Destinasi 2"
              )}
            </TableHead>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Destinasi 3"
              )}
            </TableHead>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Estimasi Biaya"
              )}
            </TableHead>
            <TableHead className="text-center font-jakarta-sans text-neutral-50">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                "Aksi"
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-neutral-50 font-jakarta-sans">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <TableSkeleton key={index} tableCell={7} />
            ))}
          {filteredData?.map((route, index) => {
            const fullDestinations = route?.destinasi || [];
            const destinations = Array.from(
              { length: 3 },
              (_, i) => fullDestinations[i]?.nama_destinasi || "-",
            );

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
                <TableCell
                  className="text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Dialog
                    img={DeleteImage}
                    action={() => handleDeletedById(route?.id)}
                    type="danger"
                    title="Hapus Data !"
                    description="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
                    textSubmit="Hapus"
                    textCancel="Batal"
                  >
                    <div>
                      <TrashCan />
                    </div>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};