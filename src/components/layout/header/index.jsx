import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function HeaderAdmin() {
  const pathname = useLocation().pathname.split("/").splice(1);
  const basePathname = pathname[0];
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex h-14 items-center gap-4 border-none bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <Link
              to={publicRoutes.HOME}
              className="flex w-full items-center justify-center gap-2 font-semibold"
            >
              <img src={Logo} className="h-16 w-28" />
            </Link>
            <Link
              to={privateRoutes.DASHBOARD}
              className="flex items-center gap-[10px] rounded-lg bg-primary-600 px-6 py-3 font-medium text-muted-foreground text-neutral-50 transition-all hover:text-neutral-200"
            >
              <DashboardIcon />
              Overview
            </Link>
            <Link
              to={privateRoutes.USER}
              className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
            >
              <PersonIcon />
              User
            </Link>
            <Link
              to={privateRoutes.ROUTE}
              className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
            >
              <AltRouteIcon />
              Rute
            </Link>
            <Link
              to={privateRoutes.CONTENT}
              className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
            >
              <VideoIcon />
              Konten
            </Link>
            <Link
              to={privateRoutes.DESTINATION}
              className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
            >
              <DestinationIcon />
              Destinasi
            </Link>
            <Link
              to={privateRoutes.ADMIN}
              className="flex items-center gap-[10px] rounded-lg bg-neutral-50 px-6 py-3 font-medium text-muted-foreground text-primary-400 transition-all hover:text-primary-600"
            >
              <PeopleAltIcon />
              Admin
            </Link>
          </nav>
          <div className="flex flex-col px-2 lg:px-[10px]">
            <h1 className="font-bold text-primary-600 lg:px-[10px]">Lainnya</h1>
            <Link
              to={publicRoutes.LOGIN}
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
                      {pathname.map((path, index) => {
                        return (
                          <>
                            <BreadcrumbItem key={index}>
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
                          </>
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

      <Avatar>
        <AvatarImage src={user.profile_image} />
        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
