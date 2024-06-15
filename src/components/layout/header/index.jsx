import {
  CircleUser,
  Menu,
  Search,
  Slash,
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
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeaderAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-14 items-center gap-4 border-none bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
        <nav>
          <div className="container mx-auto flex items-center justify-between px-4 py-5 lg:px-0">
            <div className="flex items-center gap-5">
              <ul className={`hidden md:flex md:space-x-8`}>
                <li>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink className="text-primary-500" href="/manage-user">
                          User
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </li>
              </ul>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-white hover:text-[#0A6847] focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
                {isOpen && (
                  <ul className="absolute left-0 top-16 w-full bg-white px-4 py-2 shadow-md">
                    <li>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <Slash />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/components">
                              Components
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
