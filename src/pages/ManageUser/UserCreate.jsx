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
import VisibilityOff from "@/components/icons/VisibilityOff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Eye from "@/components/icons/Eye";
import AddPhoto from "@/assets/icons/add photo.png";
import EditIcon from "@/assets/icons/edit photo.png";
import { createUsers } from "@/services/manageUser/createUsers";
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

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
      queryClient.invalidateQueries(["user"]);
      toast.success("User added successfully");
      form.reset(); 
      navigate(privateRoutes.USER);
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
      createPostMutation.mutate(values);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    }
  }

  return (
    <ProtectedLayout>
      <main className="flex h-full flex-col bg-primary-50 px-10 py-6">
        <div className="mb-4 rounded-lg bg-neutral-50 p-4 shadow-md">
          <h1 className="text-[22px] font-bold text-neutral-800">
            Tambah User
          </h1>
          <p className="text-base font-medium text-neutral-700">
            Menambahkan data pengguna
          </p>
        </div>

        <form
          className="col-span-12 grid gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-12 gap-10 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
            <div className="col-span-2 flex items-start justify-center">
              <label htmlFor="foto_profil" className="cursor-pointer">
                <div className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-neutral-100">
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
                        className="h-full w-full object-cover transition duration-500 group-hover:brightness-75 group-hover:filter"
                      />
                      <div className="absolute inset-0 bg-[#D5D5D580] opacity-0 transition-opacity duration-500 group-hover:opacity-30"></div>
                      <img
                        src={EditIcon}
                        alt="Edit Icon"
                        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
              <div className="col-span-6 mb-3">
                <Label htmlFor="username" className="pb-2 text-sm font-bold">
                  Nama Pengguna
                </Label>
                <Input
                  type="text"
                  id="username"
                  {...form.register("username")}
                />
              </div>
              <div className="col-span-6 mb-3">
                <Label
                  htmlFor="nama_lengkap"
                  className="pb-2 text-sm font-bold"
                >
                  Nama Lengkap
                </Label>
                <Input
                  type="text"
                  id="nama_lengkap"
                  {...form.register("nama_lengkap")}
                />
              </div>
              <div className="relative col-span-12 mb-3">
                <Label htmlFor="password" className="pb-2 text-sm font-bold">
                  Password
                </Label>
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
                  {visible ? <VisibilityOff /> : <Eye />}
                </button>
              </div>
              <div className="col-span-6 mb-3">
                <Label htmlFor="email" className="pb-2 text-sm font-bold">
                  Email
                </Label>
                <Input type="email" id="email" {...form.register("email")} />
              </div>
              <div className="col-span-6 mb-3">
                <Label htmlFor="no_telepon" className="pb-2 text-sm font-bold">
                  Nomor Telepon
                </Label>
                <Input
                  type="tel"
                  id="no_telepon"
                  {...form.register("no_telepon")}
                />
              </div>
              <div className="col-span-12 mb-3">
                <Label className="pb-2 text-sm font-bold">Jenis Kelamin</Label>
                <RadioGroup
                  value={form.watch("jenis_kelamin")}
                  onValueChange={(value) =>
                    form.setValue("jenis_kelamin", value)
                  }
                >
                  <div className="flex items-center">
                    <div className="flex items-center pr-6">
                      <RadioGroupItem
                        value="Pria"
                        id="male"
                        checked={form.watch("jenis_kelamin") === "Pria"}
                      />
                      <Label className="ml-2" htmlFor="male">
                        Pria
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="Wanita"
                        id="female"
                        checked={form.watch("jenis_kelamin") === "Wanita"}
                      />
                      <Label className="ml-2" htmlFor="female">
                        Wanita
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="col-span-6">
                <Label htmlFor="kota" className="pb-2 text-sm font-bold">
                  Kota/Kabupaten
                </Label>
                <Input type="text" id="kota" {...form.register("kota")} />
              </div>
              <div className="col-span-6">
                <Label htmlFor="provinsi" className="pb-2 text-sm font-bold">
                  Provinsi
                </Label>
                <Input
                  type="text"
                  id="provinsi"
                  {...form.register("provinsi")}
                />
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="mt-4 flex justify-end">
            <Button
              variant="outlined"
              color="primary"
              className="mr-6 rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-primary-500 hover:bg-primary-500 hover:text-neutral-50"
              onClick={() => navigate(privateRoutes.USER)}
            >
              Kembali
            </Button>
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
      </main>
    </ProtectedLayout>
  );
}
