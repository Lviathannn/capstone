import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { Button } from "@/components/ui/button";

export default function DetailDestination() {
  return (
    <ProtectedLayout>
      <section
        className="w-full space-y-6 rounded-tl-2xl bg-primary-50 p-6 pb-10"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="flex w-full items-center justify-between rounded-xl bg-neutral-50 p-6 shadow-md">
          <div className="">
            <h1 className="text-2xl font-bold text-neutral-800">
              Detail Destinasi
            </h1>
            <p className="text-neutral-700">
              Lihat detail data destinasi yang tersedia
            </p>
          </div>
          <Button>Kembali</Button>
        </div>
        <div className="flex gap-5">
          <div className="min-h-screen w-full rounded-xl bg-neutral-50 shadow-md"></div>
          <div className="min-h-screen w-full rounded-xl bg-neutral-50 shadow-md"></div>
        </div>
      </section>
    </ProtectedLayout>
  );
}
