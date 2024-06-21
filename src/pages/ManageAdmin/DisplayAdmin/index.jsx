import { TableAdmin } from "@/pages/ManageAdmin/DisplayAdmin/tableAdmin";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const DisplayAdmin = () => {
  return (
    <ProtectedLayout>
      <section
        className="h-full rounded-t-2xl bg-primary-50 "
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <TableAdmin />
      </section>
    </ProtectedLayout>
  );
};
