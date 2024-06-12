import * as React from "react";
import { cn } from "@/lib/utils";

const ReadOnlyField = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex w-full rounded-[10px] border-2 border-input bg-background px-3 py-3 text-sm items-center",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
ReadOnlyField.displayName = "ReadOnlyField";

export { ReadOnlyField };
