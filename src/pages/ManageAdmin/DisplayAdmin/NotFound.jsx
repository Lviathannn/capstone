import notFound from "@/assets/icons/not-found.svg";
export const NotFound = () => {
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center gap-5"
    style={{ minHeight: "calc(100vh - 350px)" }}
    >
      <img className="h-[200px] w-[200px]" src={notFound} alt="" />
      <span className="mx-auto flex items-center text-[16px] font-medium">
        Maaf, Hasil Pencarian Tidak Ditemukan!
      </span>
    </div>
  );
};