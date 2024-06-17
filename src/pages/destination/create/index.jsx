import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function CreateDestination() {
  return (
    <ProtectedLayout>
      <section
        className="w-full space-y-6 rounded-tl-2xl bg-primary-50 p-6 pb-10"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      ></section>
    </ProtectedLayout>
  );
}
