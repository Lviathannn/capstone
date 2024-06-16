import { CardHead } from "@/components/features/alert/cardHead";
import { FormEditAdmin } from "@/pages/ManageAdmin/EditAdmin/formEdit";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const EditAdmin = () => {
  return (
    <ProtectedLayout>
      <section className="rounded-t-2xl  bg-primary-50">
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
    </ProtectedLayout>
  );
};
