import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";
import EditPhoto from "@/assets/edit-photo.svg";
import Eye from "@/components/icons/Eye";
import VisibilityOff from "@/components/icons/VisibilityOff";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdmins } from "@/services/manageAdmin/addAdmins";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { privateRoutes } from "@/constant/routes";
import Dialog from "@/components/features/alert/Dialog";
import Notification from "@/components/features/alert/Notification";

const formSchema = zod.object({
  username: zod.string().min(6).max(16),
  password: zod.string().min(8).max(16),
  foto_profil: zod.any().nullable(), // Allowing nullable foto for validation
});

export const FormAddAdmin = () => {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user?.access_token);
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      foto_profil: null, // Allowing nullable foto for validation
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (values) => addAdmins(token, values),
    onSuccess:(data)=>{
      console.log("Mutation successful");
      setIsSuccess(true);
      //navigate(privateRoutes.ADMIN);
    },
    onSettled:(data,error)=>{
      console.log("onSettled successful",data,error);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
      
    },
    onError: () => {
      console.log("Mutation failed");
      setIsError(true);
    },
  });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("foto_profil", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values) => {
    try {
      await createPostMutation.mutateAsync(values);
    } catch (error) {
      throw Error(error);
    }
  }

 
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Form {...form}>
          <form className="grid gap-10" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid h-[476px] w-full items-center gap-10 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 py-5 shadow-md sm:flex sm:py-0">
              <div className="flex justify-center sm:block">
                <FormField
                  name="foto_profil"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-fit rounded-full bg-neutral-200 sm:w-[212px] ">
                          <div className=" mx-auto">
                            <img
                              className="h-[180px] w-[180px] rounded-full sm:h-[212px] sm:w-[212px]"
                              src={preview || DefaultPhoto}
                              alt="photo"
                            />
                          </div>
                          <div className="absolute left-0 top-0 rounded-full">
                            <Input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              className="mx-auto hidden rounded-full border-none bg-transparent"
                            ></Input>
                          </div>
                          <Button
                            type="button"
                            onClick={handleClick}
                            className="absolute left-0 top-0 z-10 h-full w-full rounded-full border-none bg-transparent hover:bg-transparent"
                          >
                            {preview && (
                              <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center rounded-full bg-transparent opacity-0 transition-opacity hover:bg-[#D5D5D580] hover:bg-opacity-30 hover:opacity-100">
                                <img
                                  className=""
                                  sizes="60"
                                  src={EditPhoto}
                                ></img>
                              </div>
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="max-auto flex w-full flex-col gap-10">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel className="font-jakarta-sans text-sm font-bold text-neutral-900">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={`border-solid-1 rounded-[10px] bg-transparent bg-white px-[12px] py-5 font-jakarta-sans text-sm font-normal text-neutral-700 ${form.formState.errors.username && "border-danger-400 focus-visible:ring-0"}`}
                          placeholder="Masukan nama admin"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel className="font-jakarta-sans text-sm font-bold text-neutral-900">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full rounded-[12px] ">
                          <Input
                            className={`border-solid-1 rounded-[10px] bg-transparent bg-white px-[12px] py-5 font-jakarta-sans text-sm font-normal text-neutral-700 ${form.formState.errors.password && "border-danger-400 focus-visible:ring-0"}`}
                            type={visible ? "text" : "password"}
                            placeholder="Masukan password admin"
                            {...field}
                          />
                          <button
                            className="absolute right-3 top-2"
                            type="button"
                            onClick={() => setVisible(!visible)}
                          >
                            {visible ? <VisibilityOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <Link to={privateRoutes.ADMIN} className="w-full sm:w-fit">
                <Button className="h-[42px] w-full border border-primary-500 bg-white text-sm font-medium text-primary-500 hover:bg-primary-50 hover:text-primary-500 sm:w-[180px] sm:rounded-[12px]">
                  Kembali
                </Button>
              </Link>
              <div className="w-full sm:w-[180px]">
                <Dialog
                  action={()=> form.handleSubmit(onSubmit)()}
                  title="Tambah Admin !"
                  description="Pastikan informasi benar dan sesuai sebelum menambahkan data. Yakin ingin menambahkan data ini?"
                  textSubmit="Tambah"
                  textCancel="Batal"
                >
                  <button
                    disabled={
                      !form.watch("username") || !form.watch("password")
                    }
                    className={`${
                      !form.watch("username") || !form.watch("password")
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-primary-500 hover:bg-primary-600"
                      } h-[42px] w-[180px] text-[16px] font-medium text-neutral-100 sm:rounded-[12px]`}
                  >
                    Tambah
                  </button>
                </Dialog>
                
              </div>
            </div>
          </form>
        </Form>
      </div>
      <Notification
        title={isSuccess ? "Sukses !" : "Gagal !"}
        description={
          isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
        }
        open={isSuccess || isError}
        type={isSuccess ? "success" : "error"}
      />
    </div>
  );
};
