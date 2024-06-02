import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";
import Lock from "@/components/icons/Lock";
import { Label } from "@/components/ui/label";
import Visibility from "@/components/icons/Visibility";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const FormAdd = () => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  function handleSubmit() {
    e.preventDefault();
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex h-fit w-full items-center gap-10 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 py-[132px] shadow-md">
        <div className="relative rounded-full bg-neutral-200 p-[76px]">
          <div className=" mx-auto">
            <img sizes="60" src={DefaultPhoto} alt="photo" />
          </div>
          <div className="absolute left-0 top-0 rounded-full p-[80px]">
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="mx-auto hidden rounded-full border-none bg-transparent"
            ></Input>
          </div>
          <Button
            onClick={handleClick}
            className="absolute left-0 top-0 rounded-full border-none bg-transparent p-[100px] "
          ></Button>
        </div>
        <form action="" className="mx-auto flex w-full flex-col gap-10">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label
                htmlFor="username"
                className="font-jakarta-sans text-sm font-bold text-neutral-900"
              >
                Username
              </Label>
            </div>
            <div className="w-full">
              <Input
                className=" border-solid-1 font-jakarta-sans rounded-[10px] bg-white px-[12px] py-5 text-sm font-normal text-neutral-700"
                id="username"
                type="text"
                required
                placeholder="Masukan nama admin"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label
                htmlFor="password"
                className="font-jakarta-sans text-sm font-bold text-neutral-900"
              >
                Password
              </Label>
            </div>
            <div className="relative h-12 w-full">
              <Input
                className="border-solid-1 font-jakarta-sans absolute rounded-[10px] bg-white px-[12px] py-5 text-sm font-normal text-neutral-700"
                id="password"
                type="password"
                placeholder="Masukan password admin"
                required
              />
              <Visibility className="absolute right-3 top-2" />
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-end gap-6">
        <Button className="border-primary-500 text-primary-500 hover:text-primary-500 h-[42px] w-[180px] border bg-white text-sm font-medium sm:rounded-[12px]">
          Kembali
        </Button>
        <Button className="bg-primary-500 hover:bg-primary-600 h-[42px] w-[180px] text-sm font-medium text-neutral-100 sm:rounded-[12px]">
          Tambah Admin
        </Button>
      </div>
    </div>
  );
};
