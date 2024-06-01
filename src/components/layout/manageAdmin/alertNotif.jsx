import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const AlertNotif = ({
  img,
  title,
  desc,
}) => {
  return (
    <div>
      <AlertDialog className="rounded bg-white">
        <AlertDialogContent className="h-[249px] w-[320px] bg-white sm:rounded-[16px] p-6">
          <AlertDialogHeader className="flex flex-col gap-4">
            <AlertDialogHeader className="flex items-center justify-center">
              <img className="h-[100px] w-[240px]" src={img} alt="" />
            </AlertDialogHeader>
            <AlertDialogTitle className="font-jakarta-sans text-center text-lg font-bold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-jakarta-sans w-full text-center text-sm font-medium text-neutral-600">
              {desc}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
