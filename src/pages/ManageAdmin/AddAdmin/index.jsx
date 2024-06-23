import { CardHead } from "@/components/features/alert/cardHead";
import { FormAddAdmin } from "@/pages/ManageAdmin/AddAdmin/formAdd";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const AddAdmin = () => {
  return (
    <ProtectedLayout>
      <section
        className="rounded-t-2xl bg-primary-50"
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
    </ProtectedLayout>
  );
};
