import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Eye from "@/components/icons/Eye";
import AddPhoto from "@/assets/icons/add photo.png";
import EditIcon from "@/assets/icons/edit photo.png";
import AlertAdd from "@/assets/img/alert add.png";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { createUsers } from "@/services/manageUser/createUsers";
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
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

export default function UserCreate() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.user?.access_token);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      nama_lengkap: "",
      password: "",
      email: "",
      no_telepon: "",
      jenis_kelamin: "",
      provinsi: "",
      kota: "",
      foto_profil: null,
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (values) => createUsers(token, values),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]); // Invalidasi query setelah mutasi berhasil
      toast.success("User added successfully");
      form.reset(); // Reset form setelah berhasil
      navigate("/manage-user");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add user");
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
    try {
      createPostMutation.mutate(values); // Memanggil mutasi saat formulir disubmit
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex flex-col px-10 py-6 bg-primary-50 h-full">
          <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-4">
            <h1 className="text-[22px] font-bold text-neutral-800">Tambah User</h1>
            <p className="text-base font-medium text-neutral-700">Menambahkan data pengguna</p>
          </div>
          
          <form className="grid gap-10 col-span-12" onSubmit={form.handleSubmit(onSubmit)}>
                {/* <div className="flex h-[476px] w-full items-center gap-10 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 shadow-md"> */}
                <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10">
                  <div className="col-span-2 flex justify-center items-start">
                    <label htmlFor="foto_profil" className="cursor-pointer">
                    <div className="relative w-40 h-40 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden group">
                      <input
                        type="file"
                        id="foto_profil"
                        name="foto_profil"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      {preview ? (
                        <>
                          <img
                            src={preview}
                            alt="Photo Preview"
                            className="w-full h-full object-cover transition duration-500 group-hover:filter group-hover:brightness-75"
                          />
                          <div className="absolute inset-0 bg-[#D5D5D580] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <img
                            src={EditIcon}
                            alt="Edit Icon"
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                    <div className="col-span-6 mb-3">
                      <Label htmlFor="username" className="text-sm font-bold pb-2">Nama Pengguna</Label>
                      <Input
                        type="text"
                        id="username"
                        {...form.register("username")}
                      />
                    </div>
                    <div className="col-span-6 mb-3">
                      <Label htmlFor="nama_lengkap" className="text-sm font-bold pb-2">Nama Lengkap</Label>
                      <Input
                        type="text"
                        id="nama_lengkap"
                        {...form.register("nama_lengkap")}
                      />
                    </div>
                    <div className="col-span-12 mb-3 relative">
                      <Label htmlFor="password" className="text-sm font-bold pb-2">Password</Label>
                      <Input
                        type={visible ? "text" : "password"}
                        id="password"
                        {...form.register("password")}
                        className="pr-10"
                      />
                      <button
                        className="absolute right-3 top-8 cursor-pointer"
                        type="button"
                        onClick={() => setVisible(!visible)}
                      >
                        <Eye />
                      </button>
                    </div>
                    <div className="col-span-6 mb-3">
                      <Label htmlFor="email" className="text-sm font-bold pb-2">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        {...form.register("email")}
                      />
                    </div>
                    <div className="col-span-6 mb-3">
                      <Label htmlFor="no_telepon" className="text-sm font-bold pb-2">Nomor Telepon</Label>
                      <Input
                        type="tel"
                        id="no_telepon"
                        {...form.register("no_telepon")}
                      />
                    </div>
                    <div className="col-span-12 mb-3">
                        <Label className="text-sm font-bold pb-2">Jenis Kelamin</Label>
                        <RadioGroup
                            value={form.watch("jenis_kelamin")}
                            onValueChange={(value) => form.setValue("jenis_kelamin", value)}
                        >
                            <div className="flex items-center">
                            <div className="pr-6 flex items-center">
                                <RadioGroupItem
                                value="Pria"
                                id="male"
                                checked={form.watch("jenis_kelamin") === "Pria"}
                                />
                                <Label className="ml-2" htmlFor="male">Pria</Label>
                            </div>
                            <div className="flex items-center">
                                <RadioGroupItem
                                value="Wanita"
                                id="female"
                                checked={form.watch("jenis_kelamin") === "Wanita"}
                                />
                                <Label className="ml-2" htmlFor="female">Wanita</Label>
                            </div>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="col-span-6">
                      <Label htmlFor="kota" className="text-sm font-bold pb-2">Kota/Kabupaten</Label>
                      <Input
                        type="text"
                        id="kota"
                        {...form.register("kota")}
                      />
                    </div>
                    <div className="col-span-6">
                      <Label htmlFor="provinsi" className="text-sm font-bold pb-2">Provinsi</Label>
                      <Input
                        type="text"
                        id="provinsi"
                        {...form.register("provinsi")}
                      />
                    </div>
                  </div>
                </div>
                {/* </div> */}
                <div className="flex justify-end mt-4">
                    <Button variant="outlined" color="primary" className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mr-6" onClick={() => navigate('/manage-user')}>Kembali</Button>
                    <AlertConfirm
                      textBtn="Tambah"
                      img={Add}
                      title="Tambah Data !"
                      desc="Pastikan informasi benar dan sesuai sebelum menambahkan data. Yakin ingin menambahkan data ini?"
                      textDialogCancel="Batal"
                      textDialogSubmit="Tambah"
                      onConfirm={form.handleSubmit(onSubmit)}
                      backround={`w-[180px] h-[42px] py-[10px] px-10 text-sm font-medium text-neutral-100 hover:text-neutral-100 sm:rounded-[12px] bg-primary-500`}
                      successOpen={openSuccess}
                      setSuccessOpen={setOpenSuccess}
                      errorOpen={openError}
                      setErrorOpen={setOpenError}
                    />
                </div>
              </form>
          {/* </div> */}
        </main>
      </div>
    </div>
  );
}