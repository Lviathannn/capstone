
import { CardDetail } from "./cardDetail";
import { FormDetail } from "./formDetail";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";

export const DetailAdmin = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="bg-neutral-50">
      <section className="bg-primary-50 rounded-t-2xl py-10"
      style={{minHeight: "calc(100vh - 80px)"}}
      >
        <div className="container mx-auto ">
          <div className="flex flex-col gap-10 ">
            <CardDetail></CardDetail>
            <FormDetail></FormDetail>
          </div>
        </div>
      </section>
      </main>
      </div>
      </div>
  );
};
