import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/manageUser/getUserById";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";
import { Skeleton } from "@/components/ui/skeleton";

const useGetUserId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(token, id),
    enabled: !!token && !!id,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  return { data, error, isLoading };
};

export default function UserDetail() {
  const loc = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserId(id);

  if (error) return <div>Error: {error.message}</div>;

  const user = data?.data;

  return (
    <ProtectedLayout>
      <main className="flex h-full flex-col bg-primary-50 px-10 py-6">
        <div className="mb-6 rounded-lg bg-neutral-50 p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-jakarta-sans text-[26px] font-bold text-neutral-800">
                {isLoading ? (
                  <Skeleton className="h-5 w-[858px] bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Detail User"
                )}
              </h1>
              <p className="font-jakarta-sans text-base font-medium text-neutral-700">
                {isLoading ? (
                  <Skeleton className="h-4 w-[806px] bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Lihat detail data pengguna"
                )}
              </p>
            </div>
            <Button
              className="bg-primary-500 font-jakarta-sans text-[14px] font-medium text-white"
              onClick={() => navigate(privateRoutes.USER)}
            >{isLoading ? (
              <Skeleton className="h-4 w-12 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
            ) : (
              "Kembali")}
            </Button>
            
          </div>
        </div>
        <div className="grid grid-cols-12 gap-10 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
          <div className="col-span-2 flex items-start justify-center">
            <Avatar className="ml-6 h-40 w-40">
              {isLoading ? (
                <Skeleton className="h-40 w-40 mb-5 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : (
                <img
                  src={user?.foto_profil || "https://github.com/shadcn.png"}
                  alt="foto profil"
                  className="rounded-full object-cover"
                />
              )}
            </Avatar>
          </div>
          <div className="col-span-10 grid grid-cols-12 gap-4">
            <div className="col-span-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="username">
                  Nama Pengguna
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="username" placeholder="Nama Pengguna" value={user?.username || ""} readOnly />
              )}
            </div>
            <div className="col-span-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="fullname">
                  Nama Lengkap
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="fullname" placeholder="Nama Lengkap" value={user?.nama_lengkap || ""} readOnly />
              )}
            </div>
            <div className="col-span-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="email">
                  Email
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="email" placeholder="Email" value={user?.email || ""} readOnly />
              )}
            </div>
            <div className="col-span-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="phone">
                  Nomor Telepon
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="phone" placeholder="Nomor Telepon" value={user?.no_telepon || ""} readOnly />
              )}
            </div>
            <div className="col-span-12 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="jenis_kelamin">
                  Jenis Kelamin
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-[591px] bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="jenis_kelamin" placeholder="Jenis Kelamin" value={user?.jenis_kelamin || ""} readOnly />
              )}
            </div>
            <div className="col-span-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="city">
                  Kota/Kabupaten
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="city" placeholder="Kota/Kabupaten" value={user?.kota || ""} readOnly />
              )}
            </div>
            <div className="col-span-6 mb-6">
              {isLoading ? (
                <Skeleton className="h-3 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Label className="pb-2 font-jakarta-sans text-sm font-bold" htmlFor="province">
                  Provinsi
                </Label>
              )}
              {isLoading ? (
                <Skeleton className="h-3 ml-5 w-80 bg-gradient-to-r my-3 rounded-full from-neutral-200 to-neutral-50/0" />
              ) : (
                <Input id="province" placeholder="Provinsi" value={user?.provinsi || ""} readOnly />
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedLayout>
  );
}
