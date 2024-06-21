import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getDestination } from "@/services/destination/getDestination";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import notFoundImg from "@/assets/icons/not-found.svg";
import Spinner from "@/components/ui/Spinner";

export default function DetailDestination() {
  const token = useSelector((state) => state.auth.user.access_token);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/destination");
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestination(token, id),
  });

  return (
    <ProtectedLayout>
      <section
        className="w-full space-y-6 rounded-tl-2xl bg-primary-50 p-6 pb-10"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="flex w-full items-center justify-between rounded-xl bg-neutral-50 p-6 shadow-md">
          <div className="">
            <h1 className="text-2xl font-bold text-neutral-800">
              Detail Destinasi
            </h1>
            <p className="text-neutral-700">
              Lihat detail data destinasi yang tersedia
            </p>
          </div>
          <Button
            onClick={() => {
              navigate("/destination");
            }}
          >
            Kembali
          </Button>
        </div>
        {isLoading && (
          <div className="flex justify-center pt-52">
            <Spinner />
          </div>
        )}
        {destination && destination?.status === 200 && (
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="w-full rounded-xl bg-neutral-50 p-5 shadow-md">
              {/* Image List */}
              <div className="flex w-full justify-center gap-2">
                {destination?.data?.data?.url_gambar?.map((data) => (
                  <img
                    key={data.id_media}
                    src={data?.url_media}
                    className="aspect-video w-[33.3%] rounded-lg bg-neutral-100 object-cover object-center"
                  />
                ))}
              </div>
              {/* Form */}

              <div className="mt-5 w-full space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label className="font-bold">Nama</Label>
                  <Input
                    readOnly
                    defaultValue={destination?.data?.data?.nama_destinasi || ""}
                    type="text"
                    className="w-full"
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label className="font-bold">Kategori</Label>
                  <Input
                    readOnly
                    defaultValue={destination?.data?.data?.kategori.nama || ""}
                    type="text"
                    className="w-full"
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label className="text-xl font-bold">Alamat</Label>
                  <div className="mt-2 grid w-full grid-cols-2 items-center gap-2">
                    <div className="space-y-2">
                      <Label className="font-bold">Provinsi</Label>
                      <Input
                        readOnly
                        defaultValue={
                          destination?.data?.data?.alamat_destinasi.provinsi ||
                          ""
                        }
                        type="text"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold">Kota/Kabupaten</Label>
                      <Input
                        readOnly
                        defaultValue={
                          destination?.data?.data?.alamat_destinasi.kota || ""
                        }
                        type="text"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold">Kecamatan</Label>
                      <Input
                        readOnly
                        defaultValue={
                          destination?.data?.data?.alamat_destinasi.kecamatan ||
                          ""
                        }
                        type="text"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold">Kode Pos</Label>
                      <Input
                        readOnly
                        defaultValue={
                          destination?.data?.data?.alamat_destinasi.kode_pos ||
                          ""
                        }
                        type="text"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label className="font-bold">Nama Jalan</Label>
                  <Input
                    readOnly
                    defaultValue={
                      destination?.data?.data?.alamat_destinasi.nama_jalan || ""
                    }
                    type="text"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full rounded-xl bg-neutral-50 p-5 shadow-md">
              {/* Form */}

              <div className="mt-5 w-full space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label className="font-bold">Deskripsi</Label>
                  <Textarea
                    readOnly
                    defaultValue={destination?.data?.data?.deskripsi || ""}
                    type="text"
                    className="min-h-32 w-full"
                  />
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label className="text-xl font-bold">Jam Operasional</Label>
                  <div className="mt-2 grid w-full grid-cols-2 items-center gap-2">
                    <div className="space-y-2">
                      <Label className="font-bold">Buka</Label>
                      <Input
                        readOnly
                        defaultValue={destination?.data?.data?.jam_buka || ""}
                        type="text"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold">Tutup</Label>
                      <Input
                        readOnly
                        defaultValue={destination?.data?.data?.jam_tutup || ""}
                        type="text"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold">Biaya</Label>
                      <Input
                        readOnly
                        defaultValue={
                          destination?.data?.data?.harga_masuk || "0"
                        }
                        type="number"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold">Konten</Label>
                      <Input
                        readOnly
                        defaultValue={
                          destination?.data?.data?.visit_count || ""
                        }
                        type="number"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label className="font-bold">Fasilitas</Label>
                  <div className=" w-full space-y-2">
                    {destination?.data?.data?.fasilitas?.map((data) => (
                      <Badge key={data?.id_fasilitas} className="mr-1">
                        {data.nama}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {destination && destination?.status === 404 && (
          <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-5">
            <img className="h-[200px] w-[200px]" src={notFoundImg} alt="" />
            <span className="mx-auto flex items-center text-[16px] font-medium">
              Maaf, Hasil Pencarian Tidak Ditemukan!
            </span>
          </div>
        )}
      </section>
    </ProtectedLayout>
  );
}
