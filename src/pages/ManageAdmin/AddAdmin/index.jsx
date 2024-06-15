import { CardHead } from "@/components/layout/manageAdmin/cardHead";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { FormAddAdmin } from "@/pages/ManageAdmin/AddAdmin/formAdd";

export const AddAdmin = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="bg-neutral-50">
          <section
            className="bg-primary-50 rounded-t-2xl"
            style={{ minHeight: "calc(100vh - 80px)" }}
          >
            <div className="container mx-auto ">
              <div className="flex flex-col gap-10 py-6 ">
                <CardHead
                  title="Tambah Admin"
                  desc="Tambah data admin baru disini."
                ></CardHead>
                <FormAddAdmin></FormAddAdmin>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
