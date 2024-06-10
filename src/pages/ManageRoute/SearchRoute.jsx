
import search from "@/assets/icons/search.png";

export const SearchRoute = ({searchTerm, handleSearchChange}) => {
  return (
    <div className="col-span-8 rounded-lg bg-neutral-50 p-4 lg:col-span-10">
      <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
        Kelola User Rute
      </h1>
      <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
        Kelola data rute dengan mudah
      </p>
      <div className="mt-4 flex justify-between">
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
      </div>
    </div>
  );
};
