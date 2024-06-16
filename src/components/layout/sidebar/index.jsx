import Logo from "@/assets/logo.svg";
import {
  PeopleAltIcon,
  PersonIcon,
  AltRouteIcon,
  DashboardIcon,
  DestinationIcon,
  LogoutIcon,
  VideoIcon,
} from "@/assets/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth/logout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { resetUser } from "@/lib/slice/authSlice";
import { privateRoutes, publicRoutes } from "@/constant/routes";
import { useSelector } from "react-redux";

export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      dispatch(resetUser());
    } catch {
      toast.error("Gagal keluar dari aplikasi");
    }
  };

  const getLinkClasses = (path) => {
    const baseClasses =
      "flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium transition-all";
    const isActive = location.pathname.includes(path);
    return isActive
      ? `${baseClasses} bg-primary-600 text-neutral-50 transition-all hover:text-neutral-200`
      : `${baseClasses} bg-neutral-50 text-muted-foreground text-primary-400 transition-all hover:text-primary-600`;
  };

  return (
    <div className="fixed bottom-0 left-0 top-0 z-40 hidden border-none bg-muted/40 md:block">
      <div className="fixed flex h-full max-h-screen flex-col bg-neutral-50 md:w-[240px]">
        <div className="flex h-14 items-center px-4 lg:h-[60px]">
          <Link
            to={publicRoutes.HOME}
            className="flex w-full items-center justify-center gap-2 font-semibold"
          >
            <img src={Logo} className="h-32 w-32" />
          </Link>
        </div>
        <div className="flex h-full flex-col justify-between">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-[10px] lg:py-6">
            <h1 className="px-[10px] text-lg font-bold text-primary-600">
              Navigasi
            </h1>
            <div className="mt-[15px] flex flex-col gap-1">
              <Link
                to={privateRoutes.DASHBOARD}
                className={getLinkClasses(privateRoutes.DASHBOARD)}
              >
                <DashboardIcon />
                Overview
              </Link>
              <Link
                to={privateRoutes.USER}
                className={getLinkClasses(privateRoutes.USER)}
              >
                <PersonIcon />
                User
              </Link>
              <Link
                to={privateRoutes.ROUTE}
                className={getLinkClasses(privateRoutes.ROUTE)}
              >
                <AltRouteIcon />
                Rute
              </Link>
              <Link
                to={privateRoutes.CONTENT}
                className={getLinkClasses(privateRoutes.CONTENT)}
              >
                <VideoIcon />
                Konten
              </Link>
              <Link
                to={privateRoutes.DESTINATION}
                className={getLinkClasses(privateRoutes.DESTINATION)}
              >
                <DestinationIcon />
                Destinasi
              </Link>
              {user?.role == "super admin" && (
                <Link
                  to={privateRoutes.ADMIN}
                  className={getLinkClasses(privateRoutes.ADMIN)}
                >
                  <PeopleAltIcon />
                  Admin
                </Link>
              )}
            </div>
          </nav>
          <div className="flex flex-col gap-3 px-2 py-5 lg:px-[10px]">
            <h1 className="font-bold text-primary-600 lg:px-[10px]">Lainnya</h1>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="flex justify-start gap-[10px] px-3 py-6 font-medium text-danger-500 hover:bg-danger-500 hover:text-white"
                  variant="ghost"
                >
                  <LogoutIcon />
                  Keluar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Logout ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin logout? Semua perubahan yang belum
                    disimpan akan hilang
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-danger-300 hover:bg-danger-500"
                    onClick={handleLogout}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
