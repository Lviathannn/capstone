import { CardHead } from "@/components/layout/manageAdmin/cardHead";
import Navbar from "@/components/layout/navbar-admin";
import SideBar from "@/components/layout/sidebar";
import { FormEdit } from "@/pages/ManageAdmin/EditAdmin/form";

export const EditAdmin = () => {
  return (
    <main className="bg-neutral-50">
      <Navbar></Navbar>
      <SideBar></SideBar>
      <section
        className="bg-primary-50 mt-[80px] rounded-t-2xl sm:ml-[240px]"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="container mx-auto ">
          <div className="flex flex-col gap-10 py-6 ">
            <CardHead
              title="Edit Admin"
              desc="Edit detail data admin."
            ></CardHead>
            <FormEdit></FormEdit>
          </div>
        </div>
      </section>
    </main>
  );
};
