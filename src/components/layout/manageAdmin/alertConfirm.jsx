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
  import Succes from "@/assets/ImgModal/Ilustrasi-succes.svg";

  import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertNotif } from "./alertNotif";
  
  export const AlertConfirm = ({textBtn,img, title, desc, textDialogCancel, textDialogSubmit, bgBtn}) => {

    const [succes, setSucces] = useState();

    function handleSubmit(){
        setSucces(true);
    }
    return (
      <div>
        <AlertDialog className="rounded bg-white">
          <AlertDialogTrigger asChild className="sm:rounded">
            <Button variant="outline">{textBtn}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex h-[365px] w-[464px] flex-col gap-6 bg-white sm:rounded-[16px] sm:p-6">
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
            <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
              <AlertDialogCancel className="border-primary-500 text-primary-500 hover:text-primary-500 h-[42px] w-full text-[16px] font-medium sm:rounded-[12px]">
                {textDialogCancel}
              </AlertDialogCancel>
              {
                bgBtn?
                <AlertDialogAction className="bg-danger-500 hover:bg-primary-600 h-[42px] w-full text-[16px] font-medium text-neutral-100 sm:rounded-[12px]">{textDialogSubmit}</AlertDialogAction>
                :<AlertDialogAction onClick={handleSubmit}  className="bg-primary-500 hover:bg-primary-600 h-[42px] w-full text-[16px] font-medium text-neutral-100 sm:rounded-[12px]">{textDialogSubmit}</AlertDialogAction>
              }
            </AlertDialogFooter>
          </AlertDialogContent>
          {
            succes&& (<AlertNotif
            img={Succes}
            title="Sukses!"
            desc="Proses berhasil dilakukan."
            />)
        }
        </AlertDialog>
        
      </div>
    );
  };
  