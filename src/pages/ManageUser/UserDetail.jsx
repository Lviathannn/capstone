import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export default function UserDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex flex-col px-10 py-6 bg-primary-50 h-full">
            <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[26px] font-bold text-neutral-800 font-jakarta-sans">Detail User</h1>
                    <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Lihat detail data pengguna</p>
                </div>
                <Button
                    className="bg-primary-500 text-white text-[14px] font-medium font-jakarta-sans"
                    onClick={() => navigate('/manage-user')}
                >
                    Kembali
                </Button>
                </div>
            </div>
            <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10">
                <div className="col-span-2 flex justify-center items-start">
                <Avatar className="w-44 h-44 ml-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                </div>
                <div className="col-span-10 grid grid-cols-12 gap-4">
                    <div className="col-span-6 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="username">Nama Pengguna</Label>
                        <Input id="username" placeholder="Nama Pengguna" value={user?.namaPengguna || ''} readOnly />
                    </div>
                    <div className="col-span-6 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="fullname">Nama Lengkap</Label>
                        <Input id="fullname" placeholder="Nama Lengkap" value={user?.namaLengkap || ''} readOnly />
                    </div>
                    <div className="col-span-6 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Email" value={user?.email || ''} readOnly />
                    </div>
                    <div className="col-span-6 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="phone">Nomor Telepon</Label>
                        <Input id="phone" placeholder="Nomor Telepon" value={user?.noTelpon || ''} readOnly />
                    </div>
                    <div className="col-span-12 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2">Jenis Kelamin</Label>
                        <RadioGroup value={user?.jenisKelamin || ''} readOnly>
                        <div className="flex items-center">
                            <div className="pr-6">
                                <RadioGroupItem value="Laki-laki" id="male" />
                                <Label className="ml-2" htmlFor="male">Laki-Laki</Label>
                            </div>
                            <div>
                                <RadioGroupItem value="Perempuan" id="female" />
                                <Label className="ml-2" htmlFor="female">Perempuan</Label>
                            </div>
                        </div>
                        </RadioGroup>
                    </div>
                    <div className="col-span-6 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="city">Kota/Kabupaten</Label>
                        <Input id="city" placeholder="Kota/Kabupaten" value={user?.kota || ''} readOnly />
                    </div>
                    <div className="col-span-6 mb-6">
                        <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="province">Provinsi</Label>
                        <Input id="province" placeholder="Provinsi" value={user?.provinsi || ''} readOnly />
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
