import search from "@/assets/icons/search.png";
import { Skeleton } from "@/components/ui/skeleton";

export const SearchRoute = ({ searchTerm, handleSearchChange, isLoading }) => {
  return (
    <div className="col-span-8 rounded-lg bg-neutral-50 p-4 lg:col-span-10">
      {isLoading ? (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-10 w-3/4 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
          <Skeleton className="h-5 w-1/2 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
        </div>
      ) : (
        <div>
          <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
            Kelola User Rute
          </h1>
          <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
            Kelola data rute dengan mudah
          </p>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        {isLoading ? (
          <Skeleton className="h-10 w-1/2 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
        ) : (
          <div className="flex w-full items-center rounded-lg border px-4 py-3 lg:w-1/2">
            <img src={search} alt="Search Icon" className="mr-4 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari ..."
              className="w-full border-none bg-transparent font-jakarta-sans text-neutral-800 outline-none"
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
        )}
      </div>
    </div>
  );
};
