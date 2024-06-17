import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AltRouteIcon, PeopleAltIcon, PersonIcon } from "@/assets/icons";

export default function DataTotal({ dataTotal }) {
  const [showAdminTotal, setShowAdminTotal] = useState(false);
  const admin = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (admin.role === "super admin") {
      setShowAdminTotal(true);
    } else {
      setShowAdminTotal(false);
    }
  }, [admin.role]);

  return (
    <div
      className={`grid gap-6 ${!showAdminTotal ? "grid-cols-2" : "grid-cols-3"}`}
    >
      {showAdminTotal && (
        <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4 text-neutral-100">
          <PeopleAltIcon />
          <div>
            <h1 className="text-2xl font-semibold">{dataTotal?.total_admin}</h1>
            <p>Total Admin</p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 rounded-[10px] border border-primary-500 bg-neutral-50 p-4 text-primary-700">
        <PersonIcon />
        <div>
          <h1 className="text-2xl font-semibold">{dataTotal?.total_user}</h1>
          <p>Total Pengguna</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4 text-neutral-100">
        <AltRouteIcon />
        <div>
          <h1 className="text-2xl font-semibold">{dataTotal?.total_rute}</h1>
          <p>Total Rute</p>
        </div>
      </div>
    </div>
  );
}
