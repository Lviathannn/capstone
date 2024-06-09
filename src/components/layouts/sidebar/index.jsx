import { Link } from "react-router-dom";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  AltRouteIcon,
  DashboardIcon,
  DestinationIcon,
  LogoutIcon,
  PeopleAltIcon,
  PersonIcon,
  VideoIcon,
} from "@/assets/icons";

export default function SideBar() {
  return (
    <div className="relative bg-neutral-50">
      <div className="absolute sm:fixed">
        <aside
          style={{ minHeight: "calc(100vh - 80px)" }}
          className="inset-y-0 left-0 z-10 hidden flex-col bg-neutral-50 sm:flex"
        >
          <nav className="flex w-full flex-col items-center gap-4 px-[10px] sm:py-5">
            <h1 className="text-primary-600 w-full px-[10px] text-lg font-bold">
              Navigasi
            </h1>
            <Link
              href="#"
              className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
            >
              <DashboardIcon></DashboardIcon>
              <span className="text-[16px] font-normal">OverView</span>
            </Link>
            <Link
              href="#"
              className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
            >
              <PersonIcon></PersonIcon>
              <span className="text-[16px] font-normal">User</span>
            </Link>
            <Link
              href="#"
              className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
            >
              <AltRouteIcon></AltRouteIcon>
              <span className="text-[16px] font-normal">Rute</span>
            </Link>
            <Link
              href="#"
              className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
            >
              <VideoIcon></VideoIcon>
              <span className="text-[16px] font-normal">Konten</span>
            </Link>
            <Link
              href="#"
              className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
            >
              <DestinationIcon></DestinationIcon>
              <span className="text-[16px] font-normal">Destinasi</span>
            </Link>
            <Link
              href="#"
              className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
            >
              <PeopleAltIcon></PeopleAltIcon>
              <span className="text-[16px] font-normal">Admin</span>
            </Link>
          </nav>
          <nav className="mt-auto flex w-full flex-col items-center gap-4 px-[10px] sm:py-5">
            <h1 className="text-primary-600 w-full px-[10px] text-[16px] font-bold">
              Lainnya
            </h1>
            <Button className="text-danger-500 flex w-full items-center justify-start gap-[10px] rounded-lg bg-transparent px-6 py-3 hover:bg-transparent ">
              <LogoutIcon></LogoutIcon>
              <span>Keluar</span>
            </Button>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
                  >
                    <DashboardIcon></DashboardIcon>
                    <span className="text-[16px] font-normal">OverView</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
                  >
                    <PersonIcon></PersonIcon>
                    <span className="text-[16px] font-normal">User</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
                  >
                    <AltRouteIcon></AltRouteIcon>
                    <span className="text-[16px] font-normal">Rute</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
                  >
                    <VideoIcon></VideoIcon>
                    <span className="text-[16px] font-normal">Konten</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
                  >
                    <DestinationIcon></DestinationIcon>
                    <span className="text-[16px] font-normal">Destinasi</span>
                  </Link>
                  <Link
                    href="#"
                    className="hover:bg-primary-500 text-primary-400 flex w-full items-center gap-[10px] rounded-lg px-6 py-3 transition-colors hover:text-white"
                  >
                    <PeopleAltIcon></PeopleAltIcon>
                    <span className="text-[16px] font-normal">Admin</span>
                  </Link>
                  <div className="mt-auto flex w-full flex-col items-center gap-4 px-[10px] sm:py-5">
                  <h1 className="text-primary-600 w-full px-[10px] text-[16px] font-bold">
                    Lainnya
                  </h1>
                  <Button className="text-danger-500 flex w-full items-center justify-start gap-[10px] rounded-lg bg-transparent px-6 py-3 hover:bg-transparent ">
                    <LogoutIcon></LogoutIcon>
                    <span>Keluar</span>
                  </Button>
                </div>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
        </div>
      </div>
    </div>
  );
}