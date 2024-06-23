import HeaderAdmin from "./header";
import SideBar from "./sidebar";
<<<<<<< HEAD
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProtectedLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return <Navigate to="/login" />;
  }

=======

export default function ProtectedLayout({ children }) {
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
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
