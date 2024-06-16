import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Eye from "@/components/icons/Eye";
import AddPhoto from "@/assets/icons/add photo.png";
import EditIcon from "@/assets/icons/edit photo.png";
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
import AlertEdit from "@/assets/img/alert edit.png";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

export default function UserEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};

  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
    city: "",
    province: "",
    photo: null,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.namaPengguna,
        fullName: user.namaLengkap,
        email: user.email,
        phoneNumber: user.noTelpon,
        password: "",
        gender: user.jenisKelamin,
        city: user.kota,
        province: user.provinsi,
        photo: null,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  return (
    <ProtectedLayout>
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
              <input
                type="file"
                id="photo"
                name="photo"
                className="hidden"
                onChange={handlePhotoChange}
              />
              {userData.photo ? (
                <>
                  <img
                    src={URL.createObjectURL(userData.photo)}
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
          <div className="col-span-6 mb-3">
            <Label
              htmlFor="username"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Nama Pengguna
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-6 mb-3">
            <Label
              htmlFor="fullName"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Nama Lengkap
            </Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative col-span-12 mb-3">
            <Label
              htmlFor="password"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Password
            </Label>
            <Input
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
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
            <Label
              htmlFor="email"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-6 mb-3">
            <Label
              htmlFor="phoneNumber"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Nomor Telepon
            </Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-12 mb-3">
            <Label className="pb-2 font-jakarta-sans text-sm font-bold">
              Jenis Kelamin
            </Label>
            <RadioGroup
              value={userData.gender}
              onValueChange={(value) =>
                setUserData((prevState) => ({ ...prevState, gender: value }))
              }
            >
              <div className="flex items-center">
                <div className="flex items-center pr-6">
                  <RadioGroupItem value="Laki-laki" id="male" />
                  <Label className="ml-2" htmlFor="male">
                    Laki-Laki
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="Perempuan" id="female" />
                  <Label className="ml-2" htmlFor="female">
                    Perempuan
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="col-span-6">
            <Label
              htmlFor="city"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Kota/Kabupaten
            </Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-6">
            <Label
              htmlFor="province"
              className="pb-2 font-jakarta-sans text-sm font-bold"
            >
              Provinsi
            </Label>
            <Input
              type="text"
              id="province"
              name="province"
              value={userData.province}
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
          onClick={() => navigate(privateRoutes.USER)}
        >
          Kembali
        </Button>
        {/* <Button variant="outlined" color="primary" className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mr-6" >Edit</Button> */}
        <AlertDialog>
          <AlertDialogTrigger className="rounded-lg border border-primary-500 bg-neutral-50 px-7 py-1 text-center text-sm font-medium text-primary-500 hover:bg-primary-500 hover:text-neutral-50">
            Edit
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="pb-6">
              <div className="flex justify-center pb-6">
                <img
                  src={AlertEdit}
                  alt="Alert Add"
                  className="h-[100px] w-[240px]"
                />
              </div>
              <AlertDialogTitle className="pb-4 text-center font-jakarta-sans text-lg font-bold text-neutral-900">
                Edit User?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center font-jakarta-sans text-sm font-medium text-neutral-600">
                Sebelum menambahkan data pengguna, pastikan informasi yang
                dimasukkan benar dan sesuai. Apakah Anda yakin ingin menambahkan
                data ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full justify-center">
              <AlertDialogCancel className="mx-2 w-full rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-center text-primary-500 hover:bg-primary-500 hover:text-neutral-50">
                Periksa Kembali
              </AlertDialogCancel>
              <AlertDialogAction className="mx-2 w-full rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-center text-primary-500 hover:bg-primary-500 hover:text-neutral-50">
                Simpan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedLayout>
  );
}
