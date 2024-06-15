import HeaderAdmin from "@/components/layout/header";
import { CardHead } from "@/components/layout/manageAdmin/cardHead";
import SideBar from "@/components/layout/sidebar";
import { FormEditAdmin } from "@/pages/ManageAdmin/EditAdmin/formEdit";

export const EditAdmin = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="bg-neutral-50">
          <section className="bg-primary-50  rounded-t-2xl">
            <div className="container mx-auto ">
              <div className="flex flex-col gap-10 py-6 ">
                <CardHead
                  title="Edit Admin"
                  desc="Edit detail data admin."
                ></CardHead>
                <FormEditAdmin></FormEditAdmin>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
