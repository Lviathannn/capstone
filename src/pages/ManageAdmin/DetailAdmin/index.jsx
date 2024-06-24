import { CardDetail } from "./cardDetail";
import { FormDetail } from "./formDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const DetailAdmin = () => {

  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(()=> {
      setIsLoading(false);
    }, 500);
  }, [setIsLoading] );

  return (
    <ProtectedLayout>
        <main className="bg-neutral-50 ">
          <section
            className="bg-primary-50 rounded-t-2xl "
            style={{ minHeight: "calc(100vh - 80px)" }}
          >
            <div className="px-6 sm:px-10 py-6 mx-auto ">
              <div className="flex flex-col gap-10 ">
                <CardDetail
                title={isLoading ? (
                  <Skeleton className="h-7 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 " />
                ) : (
                  "Detail Admin"
                )}
                desc={isLoading ? (
                  <Skeleton className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 " />
                ) : (
                  "Lihat detail data admin disini."
                )}
                textBtn={isLoading ? (
                  <Skeleton className=" h-4 w-[120px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 " />
                ) : (
                  "Kembali"
                )}
                />
                <FormDetail/>
              </div>
            </div>
          </section>
        </main>
    </ProtectedLayout>
  );
};
