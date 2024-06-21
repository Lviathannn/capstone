import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { privateRoutes } from "@/constant/routes";
import { Link } from "react-router-dom";

export const CardDetail = () => {
  return (
    <div>
      <div className="w-full overflow-hidden rounded-[10px] border-none shadow-md">
        <Card
          x-chunk="dashboard-05-chunk-1"
          className="grid items-end justify-between bg-neutral-50 px-2 sm:flex"
        >
          <CardHeader className="flex flex-col gap-1 sm:gap-2">
            <CardTitle className="text-[26px] font-bold text-neutral-800">
              Detail Admin
            </CardTitle>
            <CardDescription className="text-[16px] font-medium text-neutral-700">
              Lihat detail data admin disini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={privateRoutes.ADMIN}>
              <Button className="h-fit w-fit bg-primary-500 px-10 py-[13px] text-sm font-medium text-neutral-100 hover:bg-primary-600 sm:h-[48px] sm:w-[135px] sm:rounded-[12px]">
                Kembali
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
