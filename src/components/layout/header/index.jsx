import {
  CircleUser,
  Menu,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import {
  PeopleAltIcon,
  PersonIcon,
  AltRouteIcon,
  DashboardIcon,
  DestinationIcon,
  VideoIcon,
  LogoutIcon,
} from "@/assets/icons";

export default function HeaderAdmin() {
  return (
    <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col h-full justify-between">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/"
              className="flex w-full items-center justify-center gap-2 font-semibold"
            >
              <img src={Logo} className="h-16 w-28" />
            </Link>
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
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
