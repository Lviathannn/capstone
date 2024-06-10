
import { CardDetail } from "./cardDetail";
import { FormDetail } from "./formDetail";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";

export const DetailAdmin = () => {
  return (
    <main className="bg-neutral-50">
      <HeaderAdmin></HeaderAdmin>
      <SideBar></SideBar>
      <section className="bg-primary-50 rounded-t-2xl py-10 ml-[240px] mt-[80px]"
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
  );
};
