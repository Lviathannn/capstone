import Lock from "@/components/icons/Lock";
import User from "@/components/icons/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  return (
    <div className="bg-image h-screen w-full bg-cover bg-center lg:grid lg:min-h-[600px] lg:grid-cols-2 ">
      <div className="flex h-screen items-center justify-center rounded-none bg-neutral-50 py-12 lg:rounded-r-3xl">
        <div className="mx-auto grid w-[460px] gap-[42px]">
          <div className="grid w-full">
            <h1 className="text-[40px] font-bold text-primary">
              Selamat Datang!
            </h1>
            <p className="text-neutral-600">
              Masukkan nama pengguna dan kata sandi Anda untuk masuk ke halaman
              Admin.
            </p>
          </div>
          <div className="grid gap-14">
            <div className="grid gap-2">
              <Label htmlFor="username" className="font-bold text-primary">
                Nama Pengguna
              </Label>
              <div className="relative w-full rounded-[12px] bg-white">
                <User className="absolute left-3 top-2 text-primary" />
                <Input
                  id="username"
                  type="text"
                  required
                  className="absolute bg-transparent pl-12"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="font-bold text-primary">
                  Password
                </Label>
              </div>
              <div className="relative w-full rounded-[12px] bg-white">
                <Lock className="absolute left-3 top-2 text-primary" />
                <Input
                  className="absolute bg-transparent pl-12"
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full rounded-[12px]">
              Masuk
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block"></div>
    </div>
  );
}
