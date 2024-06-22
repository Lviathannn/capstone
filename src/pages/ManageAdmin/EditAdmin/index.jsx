import { CardHead } from "@/components/features/alert/cardHead";
import { FormEditAdmin } from "@/pages/ManageAdmin/EditAdmin/formEdit";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const EditAdmin = () => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  },[setIsLoading])

  return (
    <ProtectedLayout>
      <section className="rounded-t-2xl  bg-primary-50">
        <div className="container mx-auto ">
          <div className="flex flex-col gap-10 py-6 ">
            <CardHead
              title={isloading ? (
                <Skeleton className="h-7 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : ("Edit Admin")}
              desc={isloading ? (
                <Skeleton className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
              ) : ("Edit detail data admin.")}
            ></CardHead>
            <FormEditAdmin></FormEditAdmin>
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};
