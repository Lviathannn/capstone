
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
    <main className="bg-neutral-50">
      <HeaderAdmin></HeaderAdmin>
      <SideBar></SideBar>
      <TableAdmin></TableAdmin>
    </main>
  );
};
