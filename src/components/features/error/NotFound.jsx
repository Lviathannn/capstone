import NotFoundImg from "@/assets/img/404.png";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function NotFound() {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <img src={NotFoundImg} alt="error" className="w-80" />
      <h1 className="text-xl font-medium">Halaman tidak ditemukan</h1>
      {user ? (
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}