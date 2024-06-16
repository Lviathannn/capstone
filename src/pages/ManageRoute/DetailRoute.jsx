import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getRouteById } from "@/services/ManageRoute/getRouteById";
import { ReadOnlyField } from "@/components/ui/read-only-field";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function DetailRoute() {
  const id = useParams().id;
  const navigate = useNavigate();
  const useGetRouteById = (id) => {
    const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin", id],
      queryFn: () => getRouteById(token, id),
      enabled: !!token,
      onError: (error) => {
        console.error("Query error:", error);
      },
    });
    return { data, error, isLoading };
  };
  const { data, error, isLoading } = useGetRouteById(id);
  const detailRoute = data?.data;

  const defaultDestinasiCount = 3;
  const destinasi = data?.data.destinasi || [];
  const extendedDestinasi = Array.from(
    { length: defaultDestinasiCount },
    (_, index) => destinasi[index] || {},
  );

  return (
    <ProtectedLayout>
      <div className="mb-6 rounded-lg bg-neutral-50 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-jakarta-sans text-[26px] font-bold text-neutral-800">
              Detail User
            </h1>
            <p className="font-jakarta-sans text-base font-medium text-neutral-700">
              Lihat detail data pengguna
            </p>
          </div>
          <Button
            className="bg-primary-500 font-jakarta-sans text-[14px] font-medium text-white"
            onClick={() => navigate("/manage-route")}
          >
            Kembali
          </Button>
        </div>
      </div>
      <div className="flex h-full flex-col gap-2 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
        <div className="grid grid-cols-1">
          <div className="flex flex-col gap-2">
            <Label
              className="font-jakarta-sans text-sm font-bold"
              htmlFor="username"
            >
              Username
            </Label>
            <ReadOnlyField id="username" children={detailRoute?.username} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label
              className="font-jakarta-sans text-sm font-bold"
              htmlFor="Kota"
            >
              Kota
            </Label>
            <ReadOnlyField id="kota" children={detailRoute?.kota} />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="font-jakarta-sans text-sm font-bold"
              htmlFor="Nama Rute Perjalanan"
            >
              Nama Rute Perjalanan
            </Label>
            <ReadOnlyField id="namaRute" children={detailRoute?.nama_rute} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {extendedDestinasi.map((dest, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label
                className="font-jakarta-sans text-sm font-bold"
                htmlFor={`destinasi${index + 1}`}
              >
                {`Destinasi ${index + 1}`}
              </Label>
              <ReadOnlyField
                id={`destinasi${index + 1}`}
                children={dest.nama_destinasi || "-"}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1">
          <div className="flex flex-col gap-2">
            <Label
              className="font-jakarta-sans text-sm font-bold"
              htmlFor="biaya"
            >
              Estimasi Biaya
            </Label>
            <ReadOnlyField id="biaya" children={detailRoute?.estimasi_biaya} />
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
