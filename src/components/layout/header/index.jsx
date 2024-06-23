import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import LogoutImg from "@/assets/ImgModal/Ilustrasi-failed.svg";

import {
  PeopleAltIcon,
  PersonIcon,
  AltRouteIcon,
  DashboardIcon,
  DestinationIcon,
  VideoIcon,
  LogoutIcon,
} from "@/assets/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { privateRoutes, publicRoutes } from "@/constant/routes";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "@/services/auth/logout";
import { resetUser } from "@/lib/slice/authSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@/components/features/alert/Dialog";
import { Fragment } from "react";

export default function HeaderAdmin() {
  const pathname = useLocation().pathname.split("/").splice(1);
  const basePathname = pathname[0];
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      dispatch(resetUser());
    } catch {
      toast.error("Gagal keluar dari aplikasi");
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between gap-4 border-none bg-muted/40 bg-neutral-50 px-6 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex h-full flex-col justify-between"
        >
          <nav className="grid gap-2 text-lg font-medium">
            <NavLink
              to={publicRoutes.HOME}
              className="flex w-full items-center justify-center gap-2 font-semibold"
            >
              <img src={Logo} className="h-16 w-28" />
            </NavLink>
            <NavLink
              to={privateRoutes.DASHBOARD}
              className={({ isActive }) => {
                return `flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium text-muted-foreground transition-all ${isActive ? "bg-primary-600 text-neutral-50" : "bg-neutral-50 text-primary-600 hover:bg-primary-600 hover:text-neutral-50"}`;
              }}
            >
              <DashboardIcon />
              Overview
            </NavLink>
            <NavLink
              to={privateRoutes.USER}
              className={({ isActive }) => {
                return `flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium text-muted-foreground transition-all ${isActive ? "bg-primary-600 text-neutral-50" : "bg-neutral-50 text-primary-600 hover:bg-primary-600 hover:text-neutral-50"}`;
              }}
            >
              <PersonIcon />
              User
            </NavLink>
            <NavLink
              to={privateRoutes.ROUTE}
              className={({ isActive }) => {
                return `flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium text-muted-foreground transition-all ${isActive ? "bg-primary-600 text-neutral-50" : "bg-neutral-50 text-primary-600 hover:bg-primary-600 hover:text-neutral-50"}`;
              }}
            >
              <AltRouteIcon />
              Rute
            </NavLink>
            <NavLink
              to={privateRoutes.CONTENT}
              className={({ isActive }) => {
                return `flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium text-muted-foreground transition-all ${isActive ? "bg-primary-600 text-neutral-50" : "bg-neutral-50 text-primary-600 hover:bg-primary-600 hover:text-neutral-50"}`;
              }}
            >
              <VideoIcon />
              Konten
            </NavLink>
            <NavLink
              to={privateRoutes.DESTINATION}
              className={({ isActive }) => {
                return `flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium text-muted-foreground transition-all ${isActive ? "bg-primary-600 text-neutral-50" : "bg-neutral-50 text-primary-600 hover:bg-primary-600 hover:text-neutral-50"}`;
              }}
            >
              <DestinationIcon />
              Destinasi
            </NavLink>
            {user?.role == "super admin" && (
              <NavLink
                to={privateRoutes.ADMIN}
                className={({ isActive }) => {
                  return `flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium text-muted-foreground transition-all ${isActive ? "bg-primary-600 text-neutral-50" : "bg-neutral-50 text-primary-600 hover:bg-primary-600 hover:text-neutral-50"}`;
                }}
              >
                <PeopleAltIcon />
                Admin
              </NavLink>
            )}
          </nav>
          <div className="flex flex-col px-2 lg:px-[10px]">
            <h1 className="font-bold text-primary-600 lg:px-[10px]">Lainnya</h1>
            <Dialog
              actionTitle="Keluar"
              img={LogoutImg}
              title="Anda Yakin Ingin Keluar?"
              description="Perubahan tidak akan disimpan. Sampai jumpa lagi di Tourease!"
              action={handleLogout}
              type="danger"
            >
              <Button
                className="mt-2 flex w-full justify-start gap-[10px] px-3 py-6 font-medium text-danger-500 hover:bg-danger-500 hover:text-white"
                variant="ghost"
              >
                <LogoutIcon />
                Keluar
              </Button>
            </Dialog>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full ">
        <nav>
          <div className="container mx-auto flex items-center px-6 py-5 lg:px-0">
            <div className="hidden sm:flex h-14 items-center px-4 lg:h-[60px]">
              <Link
                to={publicRoutes.HOME}
                className="flex w-full items-center justify-center gap-2 font-semibold"
              >
                <img src={Logo} className="h-32 w-32" />
              </Link>
            </div>
            <div className="flex items-center gap-5 pl-20">
              <ul className={`hidden md:flex md:space-x-8`}>
                <li>
                  <Breadcrumb>
                    <BreadcrumbList>
                      {pathname.map((path, index) => {
                        return (
                          <Fragment key={path}>
                            <BreadcrumbItem>
                              <Link
                                to={
                                  index === 0
                                    ? `/${basePathname}`
                                    : `/${basePathname}/${path}`
                                }
                                className="capitalize"
                              >
                                {path}
                              </Link>
                            </BreadcrumbItem>
                            {index !== pathname.length - 1 && (
                              <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            )}
                          </Fragment>
                        );
                      })}
                    </BreadcrumbList>
                  </Breadcrumb>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.profile_image} />
          <AvatarFallback>
            {user?.username?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="font-medium text-neutral-800">{user?.username}</p>
          <p className="text-sm font-medium text-neutral-500">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}
