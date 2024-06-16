import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export const CardDetail = () => {
  return (
    <div>
      <div className="w-full overflow-hidden rounded-[10px] border-none shadow-md">
        <Card
          x-chunk="dashboard-05-chunk-1"
          className="grid sm:flex justify-between items-end bg-neutral-50 px-2"
        >
          <CardHeader className="flex flex-col sm:gap-2 gap-1">
            <CardTitle className="text-[26px] font-bold text-neutral-800">
              Detail Admin
            </CardTitle>
            <CardDescription className="text-[16px] font-medium text-neutral-700">
              Lihat detail data admin disini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={"/manage-admin"}>
            <Button className="bg-primary-500 hover:bg-primary-600 sm:h-[48px] sm:w-[135px] h-fit w-fit py-[13px] px-10 text-sm font-medium text-neutral-100 sm:rounded-[12px]">Kembali</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
