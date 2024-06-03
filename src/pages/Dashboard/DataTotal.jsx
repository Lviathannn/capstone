import { AltRouteIcon, PeopleAltIcon, PersonIcon } from "@/assets/icons";

export default function DataTotal() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4 text-neutral-100">
        <PeopleAltIcon />
        <div>
          <h1 className="text-2xl font-semibold">10</h1>
          <p>Total Admin</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-[10px] border border-primary-500 bg-neutral-50 p-4 text-primary-700">
        <PersonIcon />
        <div>
          <h1 className="text-2xl font-semibold">894</h1>
          <p>Total Pengguna</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4 text-neutral-100">
        <AltRouteIcon />
        <div>
          <h1 className="text-2xl font-semibold">1005</h1>
          <p>Total Rute</p>
        </div>
      </div>
    </div>
  );
}
