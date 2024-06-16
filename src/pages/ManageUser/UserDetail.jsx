import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

export default function UserDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};

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
            onClick={() => navigate(privateRoutes.USER)}
          >
            Kembali
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
        <div className="col-span-2 flex items-start justify-center">
          <Avatar className="ml-6 h-44 w-44">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-6 mb-6">
            <Label
              className="pb-2 font-jakarta-sans text-sm font-bold"
              htmlFor="username"
            >
              Nama Pengguna
            </Label>
            <Input
              id="username"
              placeholder="Nama Pengguna"
              value={user?.namaPengguna || ""}
              readOnly
            />
          </div>
          <div className="col-span-6 mb-6">
            <Label
              className="pb-2 font-jakarta-sans text-sm font-bold"
              htmlFor="fullname"
            >
              Nama Lengkap
            </Label>
            <Input
              id="fullname"
              placeholder="Nama Lengkap"
              value={user?.namaLengkap || ""}
              readOnly
            />
          </div>
          <div className="col-span-6 mb-6">
            <Label
              className="pb-2 font-jakarta-sans text-sm font-bold"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              value={user?.email || ""}
              readOnly
            />
          </div>
          <div className="col-span-6 mb-6">
            <Label
              className="pb-2 font-jakarta-sans text-sm font-bold"
              htmlFor="phone"
            >
              Nomor Telepon
            </Label>
            <Input
              id="phone"
              placeholder="Nomor Telepon"
              value={user?.noTelpon || ""}
              readOnly
            />
          </div>
          <div className="col-span-12 mb-6">
            <Label className="pb-2 font-jakarta-sans text-sm font-bold">
              Jenis Kelamin
            </Label>
            <RadioGroup value={user?.jenisKelamin || ""} readOnly>
              <div className="flex items-center">
                <div className="pr-6">
                  <RadioGroupItem value="Laki-laki" id="male" />
                  <Label className="ml-2" htmlFor="male">
                    Laki-Laki
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="Perempuan" id="female" />
                  <Label className="ml-2" htmlFor="female">
                    Perempuan
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="col-span-6 mb-6">
            <Label
              className="pb-2 font-jakarta-sans text-sm font-bold"
              htmlFor="city"
            >
              Kota/Kabupaten
            </Label>
            <Input
              id="city"
              placeholder="Kota/Kabupaten"
              value={user?.kota || ""}
              readOnly
            />
          </div>
          <div className="col-span-6 mb-6">
            <Label
              className="pb-2 font-jakarta-sans text-sm font-bold"
              htmlFor="province"
            >
              Provinsi
            </Label>
            <Input
              id="province"
              placeholder="Provinsi"
              value={user?.provinsi || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
