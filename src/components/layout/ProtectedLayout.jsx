import HeaderAdmin from "./header";
import SideBar from "./sidebar";

export default function ProtectedLayout({ children }) {
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
