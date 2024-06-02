import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CardDetail = () => {
  return (
    <div>
      <div className="h-fit w-full overflow-hidden rounded-[10px] border-none shadow-md">
        <Card
          x-chunk="dashboard-05-chunk-1"
          className="flex justify-between items-end bg-neutral-50 p-4"
        >
          <CardHeader className="flex flex-col gap-4">
            <CardTitle className="text-[26px] font-bold text-neutral-800">
              Detail Admin
            </CardTitle>
            <CardDescription className="text-[16px] font-medium text-neutral-700">
              Lihat detail data admin disini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-primary-500 hover:bg-primary-600 h-[48px] w-[135px] py-[13px] px-10 text-sm font-medium text-neutral-100 sm:rounded-[12px]">Kembali</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
