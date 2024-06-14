import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DataRute({dataRoute}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary-300 bg-neutral-50 p-4">
      <h1 className="text-lg font-bold text-neutral-800">Data Rute Pengguna</h1>
      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <Table>
          <TableHeader className="bg-primary-500 text-sm font-semibold">
            <TableRow>
              <TableHead className="text-neutral-50">Nama Pengguna</TableHead>
              <TableHead className="text-center text-neutral-50">
                Nama Perjalanan
              </TableHead>
              <TableHead className="text-center text-neutral-50">
                Total Destinasi
              </TableHead>
              <TableHead className="text-center text-neutral-50">
                Estimasi Biaya
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataRoute?.map((rute, id) => (
              <TableRow
                key={id}
                className="border-t border-neutral-700 text-sm font-normal text-neutral-800"
              >
                <TableCell>{rute.username}</TableCell>
                <TableCell>{rute.nama_rute}</TableCell>
                <TableCell>{rute.jumlah_destinasi}</TableCell>
                <TableCell>{rute.biaya}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
