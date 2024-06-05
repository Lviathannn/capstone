import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import Logo from "@/assets/img/logo-white.png";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="bg-image h-screen w-full bg-cover bg-center lg:grid lg:min-h-[600px] lg:grid-cols-2 ">
      <div className="container flex h-screen items-center justify-center rounded-none bg-neutral-50 py-12 lg:rounded-r-3xl">
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
          <LoginForm />
        </div>
      </div>
      <div className="container hidden items-start justify-end py-[80px] pr-[80px] lg:flex">
        <div className="flex items-center gap-6 text-neutral-50">
          <div className="">
            <h2 className="text-end text-[32px] font-bold">Tourease</h2>
            <p className="font-medium">
              Jelajahi dunia dengan mudah dan menyenangkan
            </p>
          </div>
          <img src={Logo} alt="Logo" className="size-20" />
        </div>
      </div>
    </div>
  );
}
