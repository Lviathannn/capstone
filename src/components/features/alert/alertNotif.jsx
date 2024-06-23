import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";

export const AlertNotif = ({
  open,
  onOpenChange,
  img,
  title,
  desc,
  isLoading,
}) => {
  return (
    <AlertDialog
      className="rounded bg-white"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogTrigger asChild>
        <button style={{ display: "none" }}></button>
      </AlertDialogTrigger>
      <div onClick={() => onOpenChange(false)}>
        <AlertDialogContent
          className="h-[249px] w-[320px] bg-white p-8 sm:rounded-[16px]"
          onClick={(e) => e.stopPropagation()}
        >
          <AlertDialogHeader className="flex flex-col gap-2">
            <AlertDialogHeader className="flex items-center justify-center">
              <img className="h-[100px] w-[240px]" src={img} alt="" />
            </AlertDialogHeader>
            <div className="flex flex-col gap-2">
              <AlertDialogTitle className="text-center font-jakarta-sans text-lg font-bold">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full text-center font-jakarta-sans text-sm font-medium text-neutral-600">
                {desc}
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
};
