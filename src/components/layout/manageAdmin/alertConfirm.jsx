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
<<<<<<< HEAD
<<<<<<< HEAD
import Succes from "@/assets/ImgModal/Ilustrasi-succes.svg";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertNotif } from "./alertNotif";
=======
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertNotif } from "./alertNotif";
import Succes from "@/assets/ImgModal/Ilustrasi-succes.svg";
>>>>>>> b8242bd (feat:detail route)
=======
import { AlertNotif } from "./alertNotif";
import Succes from "@/assets/ImgModal/Ilustrasi-succes.svg";
import Error from "@/assets/ImgModal/Ilustrasi-failed.svg";
>>>>>>> 6f7d814 (feat:delete route & alert notif)

export const AlertConfirm = ({
  textBtn,
  img,
  title,
  desc,
  textDialogCancel,
  textDialogSubmit,
  bgBtn,
  onConfirm,
<<<<<<< HEAD
<<<<<<< HEAD
  backround
}) => {
  const [succes, setSucces] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setSucces(true);
    if (onConfirm) {
      onConfirm();
    }
  }
  return (
    <div>
      <AlertDialog className={`rounded bg-white ${backround}`}>
        <AlertDialogTrigger asChild className="sm:rounded">
          <Button variant="outline" className={`${backround}`}>{textBtn}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex h-[365px] w-[464px] flex-col gap-6 bg-white sm:rounded-[16px] sm:p-6">
=======
=======
  successOpen,
  setSuccessOpen,
  errorOpen,
  setErrorOpen,
>>>>>>> 6f7d814 (feat:delete route & alert notif)
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (err) {
      setErrorOpen(true);
      console.error("Error deleting data: ", err);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button>{textBtn}</button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex w-[464px] flex-col gap-6 bg-white sm:rounded-[16px] sm:p-6">
>>>>>>> b8242bd (feat:detail route)
          <AlertDialogHeader className="flex flex-col gap-4">
            <AlertDialogHeader className="flex items-center justify-center">
              <img className="h-[100px] w-[240px]" src={img} alt="" />
            </AlertDialogHeader>
<<<<<<< HEAD
            <AlertDialogTitle className="font-jakarta-sans text-center text-lg font-bold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-jakarta-sans w-full text-center text-sm font-medium text-neutral-600">
=======
            <AlertDialogTitle className="text-center font-jakarta-sans text-lg font-bold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-full text-center font-jakarta-sans text-sm font-medium text-neutral-600">
>>>>>>> b8242bd (feat:detail route)
              {desc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
<<<<<<< HEAD
            <AlertDialogCancel className="border-primary-500 text-primary-500 hover:text-primary-500 h-[42px] w-full text-[16px] font-medium sm:rounded-[12px]">
=======
            <AlertDialogCancel className="h-[42px] w-full border-primary-500 text-[16px] font-medium text-primary-500 hover:text-primary-500 sm:rounded-[12px]">
>>>>>>> b8242bd (feat:detail route)
              {textDialogCancel}
            </AlertDialogCancel>
            {bgBtn ? (
              <AlertDialogAction
<<<<<<< HEAD
              onClick={handleSubmit}
               className="bg-danger-500 hover:bg-primary-600 h-[42px] w-full text-[16px] font-medium text-neutral-100 sm:rounded-[12px]">
=======
                className="h-[42px] w-full bg-danger-500 text-[16px] font-medium text-neutral-100 hover:bg-primary-600 sm:rounded-[12px]"
                onClick={handleConfirm}
              >
>>>>>>> b8242bd (feat:detail route)
                {textDialogSubmit}
              </AlertDialogAction>
            ) : (
              <AlertDialogAction
<<<<<<< HEAD
                onClick={handleSubmit}
                className="bg-primary-500 hover:bg-primary-600 h-[42px] w-full text-[16px] font-medium text-neutral-100 sm:rounded-[12px]"
=======
                className="h-[42px] w-full bg-primary-500 text-[16px] font-medium text-neutral-100 hover:bg-primary-600 sm:rounded-[12px]"
                onClick={handleConfirm}
>>>>>>> b8242bd (feat:detail route)
              >
                {textDialogSubmit}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
<<<<<<< HEAD
        {succes && (
          <AlertNotif
            img={Succes}
            title="Sukses!"
            desc="Proses berhasil dilakukan."
          />
        )}
      </AlertDialog>
=======
      </AlertDialog>

      <AlertNotif
        open={successOpen}
        onOpenChange={setSuccessOpen}
        img={Succes}
        title="Sukses!"
        desc="Proses berhasil dilakukan."
        type="success"
      />
      <AlertNotif
        open={errorOpen}
        onOpenChange={setErrorOpen}
        img={Error}
        title="Gagal"
        desc="Proses gagal dilakukan"
        type="error"
      />
>>>>>>> b8242bd (feat:detail route)
    </div>
  );
};
