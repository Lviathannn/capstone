import { z } from "zod";

export const destinationSchema = z.object({
  nama_destinasi: z.string({
    message: "Nama Destinasi Tidak Boleh Kosong !",
  }),
  id_kategori: z.string({
    message: "Kategori Tidak Boleh Kosong !",
  }),
  id_provinsi: z.string({
    message: "Provinsi Tidak Boleh Kosong !",
  }),
  id_kota: z.string({
    message: "Kota Tidak Boleh Kosong !",
  }),
  id_kecamatan: z.string({
    message: "Kecamatan Tidak Boleh Kosong !",
  }),
  kode_pos: z.string({
    message: "Kode Pos Tidak Boleh Kosong !",
  }),
  jalan: z.string({
    message: "Nama Jalan Tidak Boleh Kosong !",
  }),
  deskripsi: z.string({
    message: "Deskripsi Tidak Boleh Kosong !",
  }),
  jam_buka: z.string({
    message: "Jam Buka Tidak Boleh Kosong !",
  }),
  jam_tutup: z.string({
    message: "Jam Tutup Tidak Boleh Kosong !",
  }),
  latitude: z.string({
    message: "Latitude Tidak Boleh Kosong !",
  }),
  longitude: z.string({
    message: "Longitude Tidak Boleh Kosong !",
  }),
  harga_masuk: z.string({
    message: "Harga Tidak Boleh Kosong !",
  }),
  fasilitas: z.array(z.string()).min(1, {
    message: "Fasilitas Tidak Boleh Kosong !",
  }),
});
