import { useSelector } from "react-redux";
import HeaderAdmin from "./header";
import SideBar from "./sidebar";
import { useNavigate } from "react-router-dom";

export default function ProtectedLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <SideBar />
      <HeaderAdmin />
      <main className=" h-full bg-neutral-50 pt-16 md:pl-[240px]">
        {children}
      </main>
    </div>
  );
}
