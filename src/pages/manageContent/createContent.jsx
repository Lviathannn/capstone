import { useState, useRef, useEffect } from "react";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import AddPhoto from "@/assets/icons/add photo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import EditIcon from "@/assets/icons/edit photo.png";
import Preview from "@/assets/img/preview-video.png";
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
import AlertAdd from "@/assets/img/alert add.png";
import { AspectRatio } from "@radix-ui/themes";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

export default function CreateContent() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [userContent, setUserContent] = useState({
    namaDestinasi: "",
    deskripsiKonten: "",
    linkTerkait: "",
    video: null,
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userContent.deskripsiKonten]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setUserContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setUserContent((prevState) => ({
      ...prevState,
      video: file,
    }));
  };

  return (
    <ProtectedLayout>
      <div className="mb-4 rounded-lg bg-neutral-50 p-4 shadow-md">
        <div>
          <h1 className="font-jakarta-sans text-[22px] font-bold text-neutral-800">
            Tambah Konten
          </h1>
          <p className="font-jakarta-sans text-base font-medium text-neutral-700">
            Tambah konten video
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
        <div className="col-span-2 flex items-start justify-center">
          <label htmlFor="photo" className="cursor-pointer">
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-neutral-100">
              <input
                type="file"
                id="video"
                name="video"
                className="hidden"
                onChange={handleVideoChange}
              />
              {userContent.video ? (
                <>
                  <img
                    src={URL.createObjectURL(userContent.video)}
                    alt="Photo Preview"
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.7)" }}
                  />
                  <img
                    src={EditIcon}
                    alt="Edit Icon"
                    className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
                  />
                </>
              ) : (
                <img
                  src={AddPhoto}
                  alt="Add Photo"
                  className="h-12 w-12 cursor-pointer"
                />
              )}
            </div>
          </label>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="relative col-span-12 mb-3">
            <Label
              htmlFor="destinationName"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Nama Destinasi
            </Label>
            <Input
              type="text"
              id="destinationName"
              name="namaDestinasi"
              placeholder="Masukkan Nama Destinasi"
              value={userContent.namaDestinasi}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative col-span-12 mb-3">
            <Label
              htmlFor="description"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Deskripsi Konten
            </Label>
            <textarea
              id="description"
              name="deskripsiKonten"
              placeholder="Masukkan Deskripsi Konten"
              value={userContent.deskripsiKonten}
              onChange={handleInputChange}
              ref={textareaRef}
              className="h-auto w-full resize-none overflow-hidden rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="relative col-span-12 mb-3">
            <Label
              htmlFor="link"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Link Terkait
            </Label>
            <Input
              type="text"
              id="link"
              name="linkTerkait"
              placeholder="Masukkan Link Video"
              value={userContent.linkTerkait}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="outlined"
          color="primary"
          className="mr-6 rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-primary-500 hover:bg-primary-500 hover:text-neutral-50"
          onClick={() => navigate(privateRoutes.CONTENT)}
        >
          Kembali
        </Button>
        <AlertDialog>
          <AlertDialogTrigger className="rounded-lg border border-primary-500 bg-neutral-50 px-7 py-1 text-center text-primary-500 hover:bg-primary-500 hover:text-neutral-50">
            Tambah
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="pb-6">
              <div className="flex justify-center pb-6">
                <img
                  src={AlertAdd}
                  alt="Alert Add"
                  className="h-[100px] w-[240px]"
                />
              </div>
              <AlertDialogTitle className="pb-4 text-center font-jakarta-sans text-lg font-bold text-neutral-900">
                Tambah Data?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center font-jakarta-sans text-sm font-medium text-neutral-600">
                Sebelum menambahkan data, pastikan informasi yang dimasukkan
                benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full justify-center">
              <AlertDialogCancel className="mx-2 w-full rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-center text-primary-500 hover:bg-primary-500 hover:text-neutral-50">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction className="mx-2 w-full rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-center text-primary-500 hover:bg-primary-500 hover:text-neutral-50">
                Tambah
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedLayout>
  );
}
