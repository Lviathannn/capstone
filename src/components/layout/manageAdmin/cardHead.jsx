import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export const CardHead = ({title, desc}) => {
    return (
      <div>
        <div className="h-fit w-full overflow-hidden rounded-[10px] border-none shadow-md">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className="flex flex-col bg-neutral-50 p-4"
          >
            <CardHeader className="flex flex-col gap-4">
              <CardTitle className="text-[26px] font-bold text-neutral-800">
                {title}
              </CardTitle>
              <CardDescription className="text-[16px] font-medium text-neutral-700">
                {desc}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  };
  