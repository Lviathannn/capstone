import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <TableRow>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
      <TableCell className="text-nowrap">
        <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
      </TableCell>
    </TableRow>
  );
}
