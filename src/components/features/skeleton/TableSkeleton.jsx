import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TableSkeleton({ tableCell }) {
  return (
    <TableRow>
      {Array.from({ length: tableCell }).map((_, index) => (
        <TableCell key={index} className="text-nowrap">
          <Skeleton className="h-5 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
        </TableCell>
      ))}
    </TableRow>
  );
}
