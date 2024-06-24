import { CardDetail } from "./cardDetail";
import { FormDetail } from "./formDetail";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const DetailAdmin = () => {
  return (
    <ProtectedLayout>
      <section
        className="rounded-t-2xl bg-primary-50 py-10"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="container mx-auto ">
          <div className="flex flex-col gap-10 ">
            <CardDetail></CardDetail>
            <FormDetail></FormDetail>
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};
