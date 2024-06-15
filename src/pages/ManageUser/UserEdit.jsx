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
import AddPhoto from "@/assets/icons/add photo.png";
import EditIcon from "@/assets/icons/edit photo.png";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertEdit from "@/assets/img/alert edit.png";
import { updateUsers } from "@/services/manageUser/updateUsers";
import { getUserById } from "@/services/manageUser/getUserById";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
    queryFn: () => getUserById(id, token),
    enabled: !!token,
    onSuccess: () => setOpenSuccess(true),
    onError: (error) => {
      setOpenError(true);
      console.error("Query error:", error);
    },
  });
  return { data, isLoading, error, openSuccess, openError };
};

export default function UserEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const { data, isLoading } = useGetUserId(id);

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
        username: data?.username || "",
        password: "",
        foto_profil: data?.foto_profil || null,
        nama_lengkap: data?.nama_lengkap || "",
        email: data?.email || "",
        no_telepon: data?.no_telepon || "",
        jenis_kelamin: data?.jenis_kelamin || "",
        provinsi: data?.provinsi || "",
        kota: data?.kota || "",
      });
      if (data?.foto_profil) {
        setPreview(data.foto_profil);
      }
    }
  }, [data, form]);

  const createUpdateMutation = useMutation({
    mutationFn: (values) => updateUsers(values, token, id),
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

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (values.foto_profil instanceof File) {
      formData.append("foto_profil", values.foto_profil);
    } else if (data?.foto_profil) {
      formData.append("foto_profil", data.foto_profil);
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
          <main className="flex flex-col px-4 py-4 bg-primary-50 h-full" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Photo Preview"
                          className="w-full h-full object-cover"
                          style={{ filter: 'brightness(0.7)' }}
                        />
                        <img
                          src={EditIcon}
                          alt="Edit Icon"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 cursor-pointer"
                        />
                      </>
                    ) : (
                      <img
                        src={AddPhoto}
                        alt="Add Photo"
                        className="w-12 h-12 cursor-pointer"
                      />
                    )}
                  </div>
                </label>
              </div>
              <div className="col-span-10 grid grid-cols-12 gap-4">
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Nama Pengguna</FormLabel>
                  <FormField control={form.control} name="username">
                    {({ field }) => <Input {...field} />}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Nama Lengkap</FormLabel>
                  <FormField control={form.control} name="nama_lengkap">
                    {({ field }) => <Input {...field} />}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-12 mb-3 relative">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Password</FormLabel>
                  <FormField control={form.control} name="password">
                    {({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          type={visible ? "text" : "password"}
                          className="pr-10"
                        />
                        <button
                          className="absolute inset-y-0 right-0 flex items-center px-2"
                          type="button"
                          onClick={() => setVisible(!visible)}
                        >
                          <Eye open={visible} />
                        </button>
                      </div>
                    )}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Email</FormLabel>
                  <FormField control={form.control} name="email">
                    {({ field }) => <Input {...field} />}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Nomor Telepon</FormLabel>
                  <FormField control={form.control} name="no_telepon">
                    {({ field }) => <Input {...field} />}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-12 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Jenis Kelamin</FormLabel>
                  <FormField control={form.control} name="jenis_kelamin">
                    {({ field }) => (
                      <RadioGroup
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                        onValueChange={field.onChange}
                      >
                        <FormItem>
                          <FormLabel className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <RadioGroupItem value="laki-laki" />
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <RadioGroupItem value="perempuan" />
                            Perempuan
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    )}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Provinsi</FormLabel>
                  <FormField control={form.control} name="provinsi">
                    {({ field }) => <Input {...field} />}
                  </FormField>
                </FormItem>
                <FormItem className="col-span-6 mb-3">
                  <FormLabel className="text-sm font-bold font-jakarta-sans pb-2">Kota</FormLabel>
                  <FormField control={form.control} name="kota">
                    {({ field }) => <Input {...field} />}
                  </FormField>
                </FormItem>
              </div>
            </div>
            <div className="flex justify-end mt-4">
            <Button variant="outlined" color="primary" className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mr-6" onClick={() => navigate('/manage-user')}>Kembali</Button>
            {/* <Button variant="outlined" color="primary" className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mr-6" >Edit</Button> */}
            <AlertDialog>
                <AlertDialogTrigger className="border-primary-500 border px-7 py-1 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 text-center text-sm font-medium">Edit</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="pb-6">
                    <div className="flex justify-center pb-6">
                      <img src={AlertEdit} alt="Alert Add" className="w-[240px] h-[100px]" />
                    </div>
                    <AlertDialogTitle className="text-lg font-bold text-neutral-900 font-jakarta-sans text-center pb-4">Edit User?</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm font-medium text-neutral-600 font-jakarta-sans text-center">
                      Sebelum menambahkan data pengguna, pastikan informasi yang dimasukkan benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-center w-full">
                    <AlertDialogCancel className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mx-2 w-full text-center">Periksa Kembali</AlertDialogCancel>
                    <AlertDialogAction className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mx-2 w-full text-center">Simpan</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>
          </main>
        </Form>
      </div>
    </div>
  );
}