import { CardHead } from "@/components/features/alert/cardHead";
import { FormAddAdmin } from "@/pages/ManageAdmin/AddAdmin/formAdd";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const AddAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [setIsLoading]);

  return (
    <ProtectedLayout>
      <section
        className="rounded-t-2xl bg-primary-50"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="container mx-auto ">
          <div className="flex flex-col gap-10 py-6 ">
            <CardHead
              title={isLoading ? (
                <Skeleton className="h-7 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 " />
              ) : ("Tambah Admin")}
              desc={isLoading ? (
                <Skeleton className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 " />
              ) : ("Tambah data admin baru disini.")}
            ></CardHead>
            <FormAddAdmin></FormAddAdmin>
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};
