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
import deleteImage from "@/assets/ImgModal/Ilustrasi-delete.svg";

<<<<<<< HEAD
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
=======
export default function Dialog({ children, title, description, action, type }) {
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
  const handleConfirm = () => {
    action();
  };

  return (
    <AlertDialog>
<<<<<<< HEAD
      <AlertDialogTrigger asChild className={`w-full`}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-6">
=======
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
        <img
          src={deleteImage}
          alt="alert"
          className="mx-auto mb-8"
          width={242}
          height={100}
        />

<<<<<<< HEAD
        <AlertDialogHeader className="flex flex-col gap-4 p-[11px]">
=======
        <AlertDialogHeader>
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
          <AlertDialogTitle className="text-center text-lg font-bold">
            {title}{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
<<<<<<< HEAD
        <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
          <AlertDialogCancel className="h-[42px] w-full border-primary-500 text-[16px] font-medium text-primary-500 hover:text-primary-500">
            {textCancel}
=======
        <AlertDialogFooter className="flex">
          <AlertDialogCancel className="flex-1 hover:bg-neutral-100 hover:text-neutral-800">
            Batal
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`flex-1 ${type == "delete" ? "bg-danger-400 hover:bg-danger-500" : "bg-primary-500 hover:bg-primary-600"}`}
          >
<<<<<<< HEAD
            {textSubmit}
=======
            Hapus
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
