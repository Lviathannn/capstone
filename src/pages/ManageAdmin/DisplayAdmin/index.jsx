
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
      <div
        className="bg-primary-50 mt-[80px] rounded-t-2xl sm:ml-[240px]"
        style={{minHeight: "calc(100vh - 80px)"}}
      >
        <section className="container mx-auto flex h-full flex-col gap-5 py-6">
          <div className="flex h-fit items-center justify-between gap-4">
            <div className="h-fit w-full overflow-hidden rounded-[10px] border-none shadow-md">
              <Card
                x-chunk="dashboard-05-chunk-1"
                className="flex flex-col gap-4 bg-neutral-50 px-4"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-[26px] font-bold text-neutral-800">
                    Kelola Admin
                  </CardTitle>
                  <CardDescription className="text-[16px] font-medium text-neutral-700">
                    Kelola data admin dengan mudah!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="relative h-[48px] w-[400px] bg-neutral-50">
                      <Search className="absolute left-3 top-3" />
                      <Input
                        className="border-solid-1 font-jakarta-sans absolute h-full rounded-[10px] bg-transparent py-6 pl-12 text-sm font-normal text-neutral-700"
                        type="text"
                        placeholder="Cari..."
                        required
                      />
                    </div>
                    <div>
                      <Button className="text-primary-500 flex items-center gap-4 overflow-hidden rounded-[12px] border border-neutral-300 bg-transparent px-4  py-6 shadow-sm hover:bg-neutral-100">
                        <img src={IcAdd} sizes="24" alt="" />
                        <span>Tambah Admin</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-[218px] overflow-hidden rounded-[10px] border-none shadow-md">
              <Card
                x-chunk="dashboard-05-chunk-1"
                className="flex w-full flex-col gap-4 bg-neutral-50 px-4 py-4"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    <img src={IcAdmin} sizes="24" alt="" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <CardTitle className="text-2xl font-semibold text-neutral-900">
                    10
                  </CardTitle>
                  <div className="text-muted-foreground text-[16px] font-normal text-neutral-900">
                    Total Admin
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <TableAdmin></TableAdmin>
        </section>
      </div>
    </main>
  );
};
