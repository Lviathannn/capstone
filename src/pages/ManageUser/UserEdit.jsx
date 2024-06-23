import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Eye from "@/components/icons/Eye";
import DefaultPhoto from "@/assets/default-photo.svg";
import EditPhoto from "@/assets/edit-photo.svg";
import VisibilityOff from "@/components/icons/VisibilityOff";
import Edit from "@/assets/ImgModal/Ilustrasi-edit.svg";
import { updateUsers } from "@/services/manageUser/updateUsers";
import { getUserById } from "@/services/manageUser/getUserById";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";
import Notification from "@/components/features/alert/Notification";
import Dialog from "@/components/features/alert/Dialog";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = zod.object({
  username: zod.string().min(2, "Username harus minimal 2 karakter").max(50),
  password: zod.string().max(50).optional(),
  foto_profil: zod.any().nullable(),
  nama_lengkap: zod.string().min(1, "Nama lengkap wajib diisi").max(100),
  email: zod.string().min(1, "Email harus diisi").email("Email tidak valid"),
  no_telepon: zod.string().min(1, "Nomor telepon harus diisi").min(10, "Nomor telepon minimal 10 karakter").max(15, "Nomor telepon maksimal 15 karakter"),
  jenis_kelamin: zod.string().optional(),
  provinsi: zod.string().optional(),
  kota: zod.string().optional(),
});

export const useGetUserId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(token, id),
    enabled: !!token,
    onSuccess: () => setOpenSuccess(true),
    onError: (error) => {
      setOpenError(true);
      console.error("Query error:", error);
    },
  });
  return { data, isLoading, error };
};

export default function UserEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const token = useSelector((state) => state.auth.user?.access_token);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const { data, isLoading } = useGetUserId(id);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      foto_profil: null,
      nama_lengkap: "",
      email: "",
      no_telepon: "",
      jenis_kelamin: "",
      provinsi: "",
      kota: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data?.data?.username || "",
        password: "",
        foto_profil: data?.data?.foto_profil || null,
        nama_lengkap: data?.data?.nama_lengkap || "",
        email: data?.data?.email || "",
        no_telepon: data?.data?.no_telepon || "",
        jenis_kelamin: data?.data?.jenis_kelamin || "",
        provinsi: data?.data?.provinsi || "",
        kota: data?.data?.kota || "",
      });
      if (data?.data?.foto_profil) {
        setPreview(data.data?.foto_profil);
      }
    }
  }, [data, form]);

  const createUpdateMutation = useMutation({
    mutationFn: (values) => updateUsers(token, id, values),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user", id]);
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
        navigate(privateRoutes.USER);
      }, 2000);
    },
    onError: () => {
      setIsError(true);
      toast.error("Update data gagal dilakukan");
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

  function onSubmit(values) {
    const formData = new FormData();
    formData.append("username", values.username);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (values.foto_profil instanceof File) {
      formData.append("foto_profil", values.foto_profil);
    } else if (data?.foto_profil) {
      formData.append("foto_profil", data.data?.foto_profil);
    }
    formData.append("nama_lengkap", values.nama_lengkap);
    formData.append("email", values.email);
    formData.append("no_telepon", values.no_telepon);
    if (values.jenis_kelamin) {
      formData.append("jenis_kelamin", values.jenis_kelamin);
    }
    if (values.provinsi) {
      formData.append("provinsi", values.provinsi);
    }
    if (values.kota) {
      formData.append("kota", values.kota);
    }
    createUpdateMutation.mutate(formData);
  }

  return (
    <ProtectedLayout>
      <Form {...form}>
        <form
          className="flex h-full flex-col bg-primary-50 px-10 py-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="mb-4 rounded-lg bg-neutral-50 p-4 shadow-md">
            <div>
              <h1 className="font-jakarta-sans text-[22px] font-bold text-neutral-800">
                Edit User
              </h1>
              <p className="font-jakarta-sans text-base font-medium text-neutral-700">
                Mengedit data pengguna
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
            <div className="col-span-2 flex items-start justify-center">
              <label htmlFor="photo" className="cursor-pointer">
                <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-neutral-100">
                  <FormField
                    name="foto_profil"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-fit rounded-full bg-neutral-200">
                            <div className="mx-auto">
                              <img
                                className="h-40 w-40 rounded-full object-cover"
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
                              className="absolute left-0 top-0 h-full w-full rounded-full border-none bg-transparent hover:bg-transparent "
                            >
                              {preview && (
                                <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center rounded-full bg-transparent opacity-0 transition-opacity hover:bg-[#D5D5D580] hover:bg-opacity-30 hover:opacity-100">
                                  <img
                                    className="h-10 w-10"
                                    src={EditPhoto}
                                    alt="Edit"
                                  />
                                </div>
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </label>
            </div>
            <div className="col-span-10 grid grid-cols-12 gap-4">
              <FormItem className="col-span-6 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Nama Pengguna
                </FormLabel>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <>
                      <Input {...field} className={fieldState.invalid ? "border-danger-400" : ""} />
                      {fieldState.error && <p className="text-danger-400 text-xs">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </FormItem>
              <FormItem className="col-span-6 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Nama Lengkap
                </FormLabel>
                <FormField
                  control={form.control}
                  name="nama_lengkap"
                  render={({ field, fieldState }) => (
                    <>
                      <Input {...field} className={fieldState.invalid ? "border-danger-400" : ""} />
                      {fieldState.error && <p className="text-danger-400 text-xs">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </FormItem>
              <FormItem className="relative col-span-12 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Password
                </FormLabel>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        type={visible ? "text" : "password"}
                        className="pr-10"
                      />
                      <button
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                        type="button"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <VisibilityOff /> : <Eye />}
                      </button>
                    </div>
                  )}
                />
              </FormItem>
              <FormItem className="col-span-6 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Email
                </FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <>
                      <Input type="email" {...field} className={fieldState.invalid ? "border-danger-400" : ""} />
                      {fieldState.error && <p className="text-danger-400 text-xs">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </FormItem>
              <FormItem className="col-span-6 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Nomor Telepon
                </FormLabel>
                <FormField
                  control={form.control}
                  name="no_telepon"
                  render={({ field, fieldState }) => (
                    <>
                      <Input {...field} className={fieldState.invalid ? "border-danger-400" : ""} />
                      {fieldState.error && <p className="text-danger-400 text-xs">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </FormItem>
              <FormItem className="col-span-12 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Jenis Kelamin
                </FormLabel>
                <FormField
                  control={form.control}
                  name="jenis_kelamin"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-4"
                    >
                      <RadioGroupItem value="Pria" id="Pria" />
                      <Label htmlFor="Pria">Pria</Label>
                      <RadioGroupItem value="Wanita" id="Wanita" />
                      <Label htmlFor="Wanita">Wanita</Label>
                    </RadioGroup>
                  )}
                />
              </FormItem>
              <FormItem className="col-span-6 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Provinsi
                </FormLabel>
                <FormField
                  control={form.control}
                  name="provinsi"
                  render={({ field }) => <Input {...field} />}
                />
              </FormItem>
              <FormItem className="col-span-6 mb-3">
                <FormLabel className="pb-2 font-jakarta-sans text-sm font-bold">
                  Kota
                </FormLabel>
                <FormField
                  control={form.control}
                  name="kota"
                  render={({ field }) => <Input {...field} />}
                />
              </FormItem>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="outlined"
              color="primary"
              className="mr-6 rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-primary-500 hover:bg-primary-500 hover:text-neutral-50"
              onClick={() => navigate(privateRoutes.USER)}
            >
              Kembali
            </Button>
            <Dialog
                  action={form.handleSubmit(onSubmit)}
                  title="Simpan Perubahan !"
                  description="Pastikan perubahan Anda benar. Yakin ingin mengubah dan menyimpan data ini?"
                  textSubmit="Simpan"
                  textCancel="Periksa Kembali"
                  img={Edit}
                >
                  <button
                    className={`rounded-lg border border-primary-500 px-7 py-2 text-neutral-50 bg-primary-500  text-sm font-medium`}
                  >
                    {isLoading ? (
                      <Skeleton className="h-4 w-[30px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                    ) : (
                      "Edit"
                    )}
                  </button>
                </Dialog>
          </div>
        </form>
        <Notification
          title={isSuccess ? "Sukses !" : "Gagal !"}
          description={
            isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
          }
          open={isSuccess || isError}
          type={isSuccess ? "success" : "error"}
        />
      </Form>
    </ProtectedLayout>
  );
}
