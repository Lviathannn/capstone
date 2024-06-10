import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export const CardHead = ({title, desc}) => {
    return (
          <Card
            x-chunk="dashboard-05-chunk-1"
            className="flex flex-col bg-neutral-50 overflow-hidden rounded-[10px] border-none shadow-md"
          >
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-[26px] font-bold text-neutral-800">
                {title}
              </CardTitle>
              <CardDescription className="text-[16px] font-medium text-neutral-700">
                {desc}
              </CardDescription>
            </CardHeader>
          </Card>
    );
  };
  