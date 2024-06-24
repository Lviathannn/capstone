import successImg from "@/assets/ImgModal/Ilustrasi-succes.svg";
import failedImg from "@/assets/ImgModal/Ilustrasi-failed.svg";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Notification({ title, description, open, type }) {
  return (
    <AlertDialog asChild open={open}>
      <AlertDialogContent className="max-w-[320px]">
        <img
          src={type === "success" ? successImg : failedImg}
          alt="alert"
          className="mx-auto mb-8"
          width={242}
          height={100}
        />

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg font-bold">
            {title}{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}