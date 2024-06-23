import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dialog({
  children,
  title,
  description,
  action,
  type,
  img,
  textSubmit,
  textCancel,
}) {
  const handleConfirm = () => {
    action();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={`w-full`}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-6">
        <img
          src={img}
          alt="alert"
          className="mx-auto"
          width={242}
          height={100}
        />

        <AlertDialogHeader className="flex flex-col gap-4 p-[11px]">
          <AlertDialogTitle className="text-center text-lg font-bold">
            {title}{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
          <AlertDialogCancel className="h-[42px] w-full border-primary-500 text-[16px] font-medium text-primary-500 hover:text-primary-500">
            {textCancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`h-[42px] w-full text-[16px] font-medium ${type == "danger" ? "bg-danger-400 hover:bg-danger-500" : "bg-primary-500 hover:bg-primary-600"}`}
          >
            {textSubmit}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
