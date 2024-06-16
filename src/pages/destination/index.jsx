import Map from "@/components/icons/Map";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { privateRoutes } from "@/constant/routes";
import { Link } from "react-router-dom";

const data = [
  {
    id: "1",
    nama: "Pantai Kuta",
    kategori: "Pantai",
    provinsi: "Bali",
    kota: "Denpasar",
    alamat: "Jl. Pantai Kuta, Kuta, Badung",
    jamOperasional: "24 jam",
    biaya: 50000,
    totalKonten: "123",
  },
  {
    id: "2",
    nama: "Taman Mini Indonesia Indah",
    kategori: "Taman",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Timur",
    alamat: "Jl. Raya Taman Mini, Cipayung",
    jamOperasional: "07:00 - 22:00",
    biaya: 25000,
    totalKonten: "456",
  },
  {
    id: "3",
    nama: "Kawah Ijen",
    kategori: "Gunung",
    provinsi: "Jawa Timur",
    kota: "Banyuwangi",
    alamat: "Desa Tamansari, Licin",
    jamOperasional: "24 jam",
    biaya: 100000,
    totalKonten: "789",
  },
  {
    id: "4",
    nama: "Candi Borobudur",
    kategori: "Candi",
    provinsi: "Jawa Tengah",
    kota: "Magelang",
    alamat: "Jl. Badrawati, Borobudur",
    jamOperasional: "06:00 - 18:00",
    biaya: 30000,
    totalKonten: "321",
  },
  {
    id: "5",
    nama: "Raja Ampat",
    kategori: "Pulau",
    provinsi: "Papua Barat",
    kota: "Waisai",
    alamat: "Kabupaten Raja Ampat",
    jamOperasional: "24 jam",
    biaya: 200000,
    totalKonten: "654",
  },
  {
    id: "6",
    nama: "Danau Toba",
    kategori: "Danau",
    provinsi: "Sumatera Utara",
    kota: "Medan",
    alamat: "Parapat, Simalungun",
    jamOperasional: "24 jam",
    biaya: 150000,
    totalKonten: "987",
  },
  {
    id: "7",
    nama: "Museum Nasional",
    kategori: "Museum",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Pusat",
    alamat: "Jl. Medan Merdeka Barat No.12",
    jamOperasional: "08:00 - 17:00",
    biaya: 20000,
    totalKonten: "432",
  },
  {
    id: "8",
    nama: "Taman Safari Indonesia",
    kategori: "Kebun Binatang",
    provinsi: "Jawa Barat",
    kota: "Bogor",
    alamat: "Cisarua, Puncak",
    jamOperasional: "09:00 - 17:00",
    biaya: 180000,
    totalKonten: "765",
  },
  {
    id: "9",
    nama: "Gunung Bromo",
    kategori: "Gunung",
    provinsi: "Jawa Timur",
    kota: "Probolinggo",
    alamat: "Tosari, Pasuruan",
    jamOperasional: "24 jam",
    biaya: 35000,
    totalKonten: "678",
  },
  {
    id: "10",
    nama: "Taman Nasional Komodo",
    kategori: "Taman Nasional",
    provinsi: "Nusa Tenggara Timur",
    kota: "Labuan Bajo",
    alamat: "Pulau Komodo",
    jamOperasional: "24 jam",
    biaya: 500000,
    totalKonten: "1234",
  },
];

export default function DestinationPage() {
  return (
    <ProtectedLayout>
      <section
        className="w-full space-y-6 rounded-tl-2xl bg-primary-50 p-6 pb-10"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="grid h-full grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-start-1 w-full space-y-4 rounded-xl bg-white p-4 shadow-md sm:col-end-3 lg:col-end-5">
            <h1 className="text-[26px] font-bold leading-none text-neutral-800">
              Kelola Destinasi
            </h1>
            <p className="font-medium text-neutral-700">
              Kelola data destinasi dengan mudah!
            </p>
            <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
              <Input
                placeholder="Cari destinasi"
                className="md:max-w-[400px]"
              />
              <Link to={privateRoutes.DESTINATION + "/create"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-10 text-sm font-medium text-primary-500"
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Destinasi
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center space-y-4 rounded-xl bg-white p-4 shadow-md lg:col-start-5 lg:col-end-6">
            <Map />
            <p className="text-xl font-bold text-neutral-800">10</p>
            <p className="text-neutral-800">Total destinasi</p>
          </div>
        </div>
        <div className="max-w-screen overflow-hidden rounded-xl">
          <Table className="rounded-lg">
            <TableHeader className="rounded-lg bg-primary-500">
              <TableRow>
                <TableHead className="min-w-[300px] text-nowrap">
                  Nama
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Kategori
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Provinsi
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Kota / Kabupaten
                </TableHead>
                <TableHead className="min-w-[300px] text-nowrap">
                  Alamat
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Jam Operasional
                </TableHead>
                <TableHead className="min-w-[200px] text-nowrap">
                  Biaya
                </TableHead>
                <TableHead className="min-w-[100px] text-nowrap">
                  Total Konten
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-hidden bg-white">
              {data.map((data) => (
                <TableRow key={data.name}>
                  <TableCell className="text-nowrap">{data.nama}</TableCell>
                  <TableCell>{data.kategori}</TableCell>
                  <TableCell>{data.provinsi}</TableCell>
                  <TableCell>{data.kota}</TableCell>
                  <TableCell>{data.alamat}</TableCell>
                  <TableCell>{data.jamOperasional}</TableCell>
                  <TableCell>{data.biaya}</TableCell>
                  <TableCell>{data.totalKonten}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-center gap-5">
          <Button
            size="icon"
            variant="outline"
            className="shadow-xs group rounded-xl border-none"
          >
            <ChevronLeft
              size={16}
              className="text-neutral-600 group-hover:text-white"
            />
          </Button>
          <p className="text-sm font-bold text-neutral-600">Page 1 of 10</p>
          <Button
            size="icon"
            variant="outline"
            className="shadow-xs group rounded-xl border-none"
          >
            <ChevronRight
              size={16}
              className="text-neutral-600 group-hover:text-white"
            />
          </Button>
        </div>
      </section>
    </ProtectedLayout>
  );
}
