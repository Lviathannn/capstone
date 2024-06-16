import { TableAdmin } from "@/pages/ManageAdmin/DisplayAdmin/tableAdmin";
import HeaderAdmin from "@/components/layout/header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

export const DisplayAdmin = () => {
  return (
    <ProtectedLayout>
      <section
        className="h-full rounded-t-2xl bg-primary-50 "
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <TableAdmin />
      </section>
    </ProtectedLayout>
  );
};
