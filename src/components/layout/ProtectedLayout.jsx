import HeaderAdmin from "./header";
import SideBar from "./sidebar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="h-full bg-neutral-50">{children}</main>
      </div>
    </div>
  );
}
