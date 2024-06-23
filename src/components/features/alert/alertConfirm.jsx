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
import { AlertNotif } from "./alertNotif";
import Succes from "@/assets/ImgModal/Ilustrasi-succes.svg";
import Error from "@/assets/ImgModal/Ilustrasi-failed.svg";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export const AlertConfirm = ({
  textBtn,
  img,
  title,
  desc,
  isLoading,
  textDialogCancel,
  textDialogSubmit,
  bgBtn,
  onConfirm,
  backround,
  disabled,
  openNotif,
}) => {
  const [open, setOpen] = useState(false);
  const handleConfirm = async () => {
    try {
      console.log("confirm jalan");
      console.log(onConfirm);
      await onConfirm();
      setTimeout(()=>{
        setShowModal(true)
      }, 3000)
    } catch (error) {
      setShowModal(true);
    }
}
  useEffect(() => {
    console.log("showModal updated:", open);
    console.log(openNotif.isSuccess);
  }, [open, openNotif]);

  return (
    <div>
      <AlertDialog className={`rounded bg-white ${backround}`}>
        <AlertDialogTrigger asChild className={`sm:rounded ${backround}`}>
          <Button
            variant="outline"
            className={`w-full  ${disabled ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400" : "bg-primary-500 hover:bg-primary-600"}${backround}`}
          >
            {textBtn}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex w-[464px] flex-col gap-6 bg-white sm:rounded-[16px] sm:p-6">
          <AlertDialogHeader className="flex flex-col gap-4">
            <AlertDialogHeader className="flex items-center justify-center">
              <img className="h-[100px] w-[240px]" src={img} alt="" />
            </AlertDialogHeader>
            <AlertDialogTitle className="text-center font-jakarta-sans text-lg font-bold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-full text-center font-jakarta-sans text-sm font-medium text-neutral-600">
              {desc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
            <AlertDialogCancel className="h-[42px] w-full border-primary-500 text-[16px] font-medium text-primary-500 hover:text-primary-500 sm:rounded-[12px]">
              {textDialogCancel}
            </AlertDialogCancel>
            {bgBtn ? (
              <AlertDialogAction
                className="h-[42px] w-full bg-danger-500 text-[16px] font-medium text-neutral-100 hover:bg-danger-600 sm:rounded-[12px]"
                onClick={handleConfirm}
              >
                {textDialogSubmit}
              </AlertDialogAction>
            ) : (
              <AlertDialogAction
                className="h-[42px] w-full bg-primary-500 text-[16px] font-medium text-neutral-100 hover:bg-primary-600 sm:rounded-[12px]"
                onClick={handleConfirm}
              >
                {textDialogSubmit}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertNotif
        open={open}
        onOpenChange={setOpen}
        img={openNotif.isSuccess ? Succes : Error}
        title={openNotif.isSuccess ? "Berhasil" : "Gagal"}
        desc={
          openNotif.isSuccess ? "Data berhasil dihapus" : "Data gagal dihapus"
        }
      />
    </div>
  );
};
