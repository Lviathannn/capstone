import SideBar from "@/components/layout/sidebar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Search from "@/components/icons/Search";
import IcAdmin from "@/components/icons/ic-admin.svg";
import IcAdd from "@/components/icons/ic-add.svg";
import { TableAdmin } from "@/pages/ManageAdmin/DisplayAdmin/tableAdmin";
import HeaderAdmin from "@/components/layout/header";

export const DisplayAdmin = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="bg-neutral-50 h-full">
          <section
            className="bg-primary-50 rounded-t-2xl h-full "
            style={{ minHeight: "calc(100vh - 80px)" }}
          >
            <TableAdmin></TableAdmin>
          </section>
        </main>
      </div>
    </div>
  );
};
