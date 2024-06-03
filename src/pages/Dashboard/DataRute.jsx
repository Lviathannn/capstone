import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DataRute() {
  const rutes = [
    {
      id: "AAA001",
      username: "user01",
      start: "titik A",
      finish: "titik B",
      duration: "2 (dua)",
    },
    {
      id: "AAA002",
      username: "user02",
      start: "titik C",
      finish: "titik D",
      duration: "5 (lima)",
    },
    {
      id: "AAA003",
      username: "user03",
      start: "titik E",
      finish: "titik F",
      duration: "4 (empat)",
    },
    {
      id: "AAA004",
      username: "user04",
      start: "titik G",
      finish: "titik H",
      duration: "1 (satu)",
    },
    {
      id: "AAA005",
      username: "user05",
      start: "titik I",
      finish: "titik J",
      duration: "3 (tiga)",
    },
  ];
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary-300 bg-neutral-50 p-4">
      <h1 className="text-lg font-bold text-neutral-800">Data Rute Pengguna</h1>
      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <Table>
          <TableHeader className="bg-primary-500 text-sm font-semibold">
            <TableRow>
              <TableHead className="text-neutral-50">ID</TableHead>
              <TableHead className="text-center text-neutral-50">
                Username
              </TableHead>
              <TableHead className="text-center text-neutral-50">
                Titik Awal
              </TableHead>
              <TableHead className="text-center text-neutral-50">
                Titik Akhir
              </TableHead>
              <TableHead className="text-center text-neutral-50">
                Durasi (hari)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rutes.map((rute) => (
              <TableRow
                key={rute.id}
                className="border-t border-neutral-700 text-sm font-normal text-neutral-800"
              >
                <TableCell>{rute.id}</TableCell>
                <TableCell>{rute.username}</TableCell>
                <TableCell>{rute.start}</TableCell>
                <TableCell>{rute.finish}</TableCell>
                <TableCell>{rute.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
