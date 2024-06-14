
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
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth/logout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { resetUser } from "@/lib/slice/authSlice";

export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
    const baseClasses = "flex items-center gap-[10px] rounded-lg px-6 py-3 font-medium transition-all";
    const isActive = location.pathname === path;
    return isActive ? `${baseClasses} bg-primary-600 text-neutral-50 transition-all hover:text-neutral-200` : `${baseClasses} bg-neutral-50 text-muted-foreground text-primary-400 transition-all hover:text-primary-600`;
  };

  return (
    <div className="hidden border-none bg-muted/40 md:block">
      <div className="fixed flex h-full max-h-screen flex-col md:w-[220px] lg:w-[240px]">
        <div className="flex h-14 items-center px-4 lg:h-[60px]">
          <Link
            to="/"
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
                to="/dashboard"
                className={getLinkClasses('/dashboard')}
              >
                <DashboardIcon />
                Overview
              </Link>
              <Link
                to="/manage-user"
                className={getLinkClasses('/manage-user')}
              >
                <PersonIcon />
                User
              </Link>
              <Link
                to="/manage-route"
                className={getLinkClasses('/manage-route')}
              >
                <AltRouteIcon />
                Rute
              </Link>
              <Link
                to="/manage-content"
                className={getLinkClasses('/manage-content')}
              >
                <VideoIcon />
                Konten
              </Link>
              <Link
                to="#"
                className={getLinkClasses('#')}
              >
                <DestinationIcon />
                Destinasi
              </Link>
              <Link
                to="/manage-admin"
                className={getLinkClasses('/manage-admin')}
              >
                <PeopleAltIcon />
                Admin
              </Link>
            </div>
          </nav>
          <div className="flex flex-col gap-3 px-2 py-5 lg:px-[10px]">
            <h1 className="font-bold text-primary-600 lg:px-[10px]">Lainnya</h1>
            <Button
              className="flex justify-start gap-[10px] px-3 py-6 font-medium text-danger-500 hover:bg-danger-500 hover:text-white"
              variant="ghost"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
