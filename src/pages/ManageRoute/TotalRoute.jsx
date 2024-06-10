import person from "@/assets/icons/person.png";

export const TotalRoute = ({ filteredData }) => {
  return (
    <div className="items-left col-span-4 flex flex-col justify-center rounded-lg bg-neutral-50 p-4 lg:col-span-2">
      <img src={person} alt="Person Icon" className="mb-4 h-6 w-6" />
      <p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
        {filteredData?.length}
      </p>
      <p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
        Total Rute
      </p>
    </div>
  );
};
