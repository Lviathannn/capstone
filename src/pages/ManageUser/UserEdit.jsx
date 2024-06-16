import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Eye from "@/components/icons/Eye";
import DefaultPhoto from "@/assets/default-photo.svg";
import EditPhoto from "@/assets/edit-photo.svg";
import VisibilityOff from "@/components/icons/VisibilityOff";
import Edit from "@/assets/ImgModal/Ilustrasi-edit.svg";
import EditIcon from "@/assets/icons/edit photo.png";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertEdit from "@/assets/img/alert edit.png";
import { updateUsers } from "@/services/manageUser/updateUsers";
import { getUserById } from "@/services/manageUser/getUserById";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";

const formSchema = zod.object({
  username: zod.string().min(2).max(50),
  password: zod.string().min(1).max(50),
  foto_profil: zod.any().nullable(),
  nama_lengkap: zod.string().min(1).max(100),
  email: zod.string().email(),
  no_telepon: zod.string().min(10).max(15),
  jenis_kelamin: zod.string().min(1),
  provinsi: zod.string().min(1),
  kota: zod.string().min(1),
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
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

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
      queryClient.invalidateQueries(["user", id]);
      toast.success("Data pengguna berhasil diubah");
      navigate("/manage-user");
    },
    onError: () => {
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
    console.log(values);
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
    formData.append("jenis_kelamin", values.jenis_kelamin);
    formData.append("provinsi", values.provinsi);
    formData.append("kota", values.kota);
    createUpdateMutation.mutate(formData);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <Form {...form}>
          <form className="flex flex-col px-4 py-4 bg-primary-50 h-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-4">
              <div>
                <h1 className="text-[22px] font-bold text-neutral-800 font-jakarta-sans">Edit User</h1>
                <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Mengedit data pengguna</p>
              </div>
            </div>
            <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-4">
              <div className="col-span-2 flex justify-center items-start">
                <label htmlFor="photo" className="cursor-pointer">
                  <div className="relative w-40 h-40 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden">
                    <FormField
                      name="foto_profil"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div className="relative sm:w-[212px] w-fit rounded-full bg-neutral-200 ">
                              <div className=" mx-auto">
                                <img
                                  className="h-[180px] w-[180px] sm:h-[212px] sm:w-[212px] rounded-full"
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
                                className="absolute w-full h-full left-0 top-0 rounded-full border-none bg-transparent hover:bg-transparent "
                              >
                                {preview&&
                                  <div className="z-20 bg-transparent rounded-full hover:bg-[#D5D5D580] hover:bg-opacity-30 absolute w-full h-full left-0 top-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"><img className="" sizes="60" src={EditPhoto}></img></div>
                                } 
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
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Nama Pengguna</FormLabel>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => <Input {...field} />}
                  />
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Nama Lengkap</FormLabel>
                  <FormField
                    control={form.control}
                    name="nama_lengkap"
                    render={({ field }) => <Input {...field} />}
                  />
                </FormItem>
                <FormItem className="col-span-12 mb-3 relative">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Password</FormLabel>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <div className="relative">
                        <Input {...field} type={visible ? "text" : "password"} className="pr-10" />
                        <button className="absolute inset-y-0 right-0 flex items-center px-2" type="button" onClick={() => setVisible(!visible)}>
                          {
                            visible ? <VisibilityOff /> : <Eye />
                          }
                        </button>
                      </div>
                    )}
                  />
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Email</FormLabel>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => <Input type="email" {...field} />}
                  />
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Nomor Telepon</FormLabel>
                  <FormField
                    control={form.control}
                    name="no_telepon"
                    render={({ field }) => <Input {...field} />}
                  />
                </FormItem>
                <FormItem className="col-span-12 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Jenis Kelamin</FormLabel>
                  <FormField
                    control={form.control}
                    name="jenis_kelamin"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                      >
                        <RadioGroupItem value="Laki-Laki" id="Laki-Laki" />
                        <Label htmlFor="Laki-Laki">Laki-Laki</Label>
                        <RadioGroupItem value="Perempuan" id="Perempuan" />
                        <Label htmlFor="Perempuan">Perempuan</Label>
                      </RadioGroup>
                    )}
                  />
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Provinsi</FormLabel>
                  <FormField
                    control={form.control}
                    name="provinsi"
                    render={({ field }) => <Input {...field} />}
                  />
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Kota</FormLabel>
                  <FormField
                    control={form.control}
                    name="kota"
                    render={({ field }) => <Input {...field} />}
                  />
                </FormItem>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outlined" color="primary" className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mr-6" onClick={() => navigate('/manage-user')}>Kembali</Button>
              
              <AlertConfirm
                textBtn="Edit"
                img={Edit}
                title="Simpan Perubahan !"
                desc="Pastikan perubahan Anda benar. Yakin ingin mengubah dan menyimpan data ini?"
                textDialogCancel="Periksa Kembali"
                textDialogSubmit="Simpan"
                onConfirm={form.handleSubmit(onSubmit)}
                disabled={!form.watch('username')}
                successOpen={openSuccess}
                setSuccessOpen={setOpenSuccess}
                errorOpen={openError}
                isLoading={isLoading}
                setErrorOpen={setOpenError}
                backround={`w-[180px] h-[42px] py-[13px] px-10 text-sm font-medium text-neutral-100 hover:text-neutral-100 sm:rounded-[12px]`}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}