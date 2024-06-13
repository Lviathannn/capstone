import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";

import Eye from "@/components/icons/Eye";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUsers } from "@/services/manageAdmin/addUsers";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";
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

const formSchema = zod.object({
  username: zod.string().min(2).max(50),
  password: zod.string().min(1).max(50),
  foto_profil: zod.any().nullable(), // Allowing nullable foto for validation
});

export const FormAddAdmin = () => {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user?.access_token);
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(token);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      foto_profil: null, // Allowing nullable foto for validation
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (values) => addUsers(token, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("User added successfully");
      console.log("success bro!");
      form.reset();
      navigate("/manage-admin");
    },
    onError: (error) => {
      console.error(error);
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
    console.log("Nama file", file);
  };

  //   const handleConfirmClick = () => {
  //     const values = form.getValues();
  //     const result = formSchema.safeParse(values);

  //     if (!result.success) {
  //         result.error.errors.forEach((error) => {
  //             toast.error(error.message);
  //           });
  //     } else {
  //       form.handleSubmit(onSubmit)();
  //     }
  //   };

  function onSubmit(values) {
    try {
      console.log(values);
      console.log("coba submit");
      createPostMutation.mutate(values);
    } catch (error) {
      console.log(error);
      toast.error("Tidak berhasil menambahkan Admin");
    }
  }
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Form {...form}>
          <form className="grid gap-10" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex h-[476px] w-full items-center gap-10 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 shadow-md">
              <div>
                <FormField
                  name="foto_profil"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-[212px] rounded-full bg-neutral-200 ">
                          <div className=" mx-auto">
                            <img
                              className="h-[212px] w-[212px] rounded-full"
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
                            className="absolute left-0 top-0 rounded-full border-none bg-transparent p-[108px] hover:bg-transparent "
                          ></Button>
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
                          className={`border-solid-1 font-jakarta-sans rounded-[10px] bg-transparent bg-white px-[12px] py-5 text-sm font-normal text-neutral-700 ${form.formState.errors.username && "border-danger-400 focus-visible:ring-0"}`}
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
                            className={`border-solid-1 font-jakarta-sans rounded-[10px] bg-transparent bg-white px-[12px] py-5 text-sm font-normal text-neutral-700 ${form.formState.errors.password && "border-danger-400 focus-visible:ring-0"}`}
                            type={visible ? "text" : "password"}
                            placeholder="Masukan password admin"
                            {...field}
                          />
                          <button
                            className="absolute right-3 top-2"
                            type="button"
                            onClick={() => setVisible(!visible)}
                          >
                            <Eye />
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-6">
              <Link to="/manage-admin">
                <Button className="border-primary-500 text-primary-500 hover:text-primary-500 hover:bg-primary-50 h-[42px] w-[180px] border bg-white text-sm font-medium sm:rounded-[12px]">
                  Kembali
                </Button>
              </Link>
              <div className="w-[180px]">
                <AlertConfirm
                  textBtn="Modal Add"
                  img={Add}
                  title="Tambah Admin?"
                  desc="Sebelum menambahkan admin, pastikan informasi yang dimasukkan
        benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?"
                  textDialogCancel="Batal"
                  textDialogSubmit="Tambah"
                  onConfirm={form.handleSubmit(onSubmit)}
                  //onClick={() => {handleConfirmClick}}
                  backround={`w-[180px] h-[42px] bg-primary-500 hover:bg-primary-600 py-[13px] px-10 text-sm font-medium text-neutral-100 hover:text-neutral-100 sm:rounded-[12px]`}
                ></AlertConfirm>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
