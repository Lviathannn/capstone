import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";

import Eye from "@/components/icons/Eye";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUsers } from "@/services/manageAdmin/addUsers";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";
import { useForm } from "react-hook-form";
import Edit from "@/assets/ImgModal/Ilustrasi-edit.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAdmins } from "@/services/manageAdmin/updateAdmin";
import { useQuery } from "@tanstack/react-query";
import { getAdminById } from "@/services/manageAdmin/getAdminById";

const formSchema = zod.object({
  username: zod.string().min(2).max(50),
  password: zod.string().optional(),
  foto_profil: zod.any().nullable(), // Allowing nullable foto for validation
});

export const useGetAdminId = (id) => {
    const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin"],
      queryFn: () => getAdminById(token, id),
      enabled: !!token,
      onError: (error) => {
        console.error("Query error:", error);
      },
    });
    return { data, error, isLoading };
  };

export const FormEditAdmin = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useGetAdminId(id);
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

  const createUpdateMutation = useMutation({
    mutationFn: (values) => updateAdmins(token, id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("User update successfully");
    //   form.reset({
    //     username: updatedData?.username || data?.data?.username || "",
    //     password: "", // Leave password empty initially for security reasons
    //     foto_profil: updatedData?.foto_profil || data?.data?.foto_profil || null,
    //   });
    //   if (updatedData?.foto_profil || data?.data?.foto_profil) {
    //     setPreview(updatedData?.foto_profil || data?.data?.foto_profil);
    //   }
      navigate('/manage-admin')
    },
    onError: (error) => {
        console.error(error);
      },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data?.data?.username || "",
        password: "", // Leave password empty initially for security reasons
        foto_profil: data?.data?.foto_profil || null, // Leave foto empty initially
      });
      if (data?.data?.foto_profil) {
        setPreview(data?.data?.foto_profil);
      }
    }
  }, [data, form]);

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

 async function onSubmit(values) {
    try {
    const formData = new FormData();
    formData.append('username', values.username);
    if (values.password) {
      formData.append('password', values.password);
    }
    // Handle foto_profil if it's a URL from Cloudinary
    if (typeof values.foto_profil === 'string' && values.foto_profil.includes('cloudinary')) {
        try {
          const response = await fetch(values.foto_profil);
          const blob = await response.blob();
          const fileName = values.foto_profil.substring(values.foto_profil.lastIndexOf('/') + 1); // Mengambil nama file dari URL
          const file = new File([blob], fileName, { type: blob.type });
          formData.append('foto_profil', file);
        } catch (error) {
          toast.error('Failed to update profile picture');
          return;
        }
      } else if (values.foto_profil instanceof File) {
        formData.append('foto_profil', values.foto_profil);
      } else if (data?.data?.foto_profil) {
        formData.append('foto_profil', data.data.foto_profil);
      }
      createUpdateMutation.mutate(formData);
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
                <Button type="button" className="border-primary-500 text-primary-500 hover:text-primary-500 hover:bg-primary-50 h-[42px] w-[180px] border bg-white text-sm font-medium sm:rounded-[12px]">
                  Kembali
                </Button>
              </Link>
              <div className="w-[180px]">
                <AlertConfirm
                  textBtn="Simpan"
                  img={Edit}
                  title="Edit Admin?"
                  desc="Sebelum mengedit admin, pastikan informasi yang dimasukkan benar
                  dan sesuai. Apakah Anda yakin ingin mengedit data ini?"
                  textDialogCancel="Periksa Kembali"
                  textDialogSubmit="Simpan"
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
