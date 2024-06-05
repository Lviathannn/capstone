import { PeopleAltIcon, PersonIcon, AltRouteIcon, DashboardIcon, DestinationIcon, LogoutIcon } from "@/assets/icons";
import Logo from "@/assets/logo.svg";
import { VideoIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="fixed flex h-full max-h-screen flex-col md:w-[220px] lg:w-[240px]">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 font-semibold"
          >
            <img src={Logo} className="h-32 w-32" />
          </Link>
        </div>
        <div className="flex h-full flex-col justify-between border border-black">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-[10px] lg:py-6">
            <h1 className="px-[10px] text-lg font-bold text-primary-600">
              Navigasi
            </h1>
            <div className="mt-[15px] flex flex-col gap-1">
              <Link
                to="#"
                className="flex items-center gap-[10px] rounded-lg bg-primary-600 px-6 py-3 font-medium text-muted-foreground text-neutral-50 transition-all hover:text-neutral-200"
              >
                <DashboardIcon />
                Overview
              </Link>
              <Link
                to="#"
                className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
              >
                <PersonIcon />
                User
              </Link>
              <Link
                to="#"
                className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
              >
                <AltRouteIcon />
                Rute
              </Link>
              <Link
                to="#"
                className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
              >
                <VideoIcon />
                Konten
              </Link>
              <Link
                to="#"
                className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
              >
                <DestinationIcon />
                Destinasi
              </Link>
              <Link
                to="#"
                className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
              >
                <PeopleAltIcon />
                Admin
              </Link>
            </div>
          </nav>
          <div className="flex flex-col px-2 lg:px-[10px]">
            <h1 className="font-bold text-primary-600 lg:px-[10px]">Lainnya</h1>
            <Link
              to="/"
              className="flex gap-[10px] px-3 py-6 font-medium text-danger-500"
            >
              <LogoutIcon />
              Keluar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
