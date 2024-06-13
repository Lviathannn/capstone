import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Eye from "@/components/icons/Eye";
import AddPhoto from "@/assets/icons/add photo.png"
import EditIcon from "@/assets/icons/edit photo.png";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import AlertEdit from "@/assets/img/alert edit.png";

export default function UserEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};

  const [userData, setUserData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: '',
    city: '',
    province: '',
    photo: null
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.namaPengguna,
        fullName: user.namaLengkap,
        email: user.email,
        phoneNumber: user.noTelpon,
        password: '',
        gender: user.jenisKelamin,
        city: user.kota,
        province: user.provinsi,
        photo: null
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUserData(prevState => ({
      ...prevState,
      photo: file
    }));
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex flex-col px-4 py-4 bg-primary-50 h-full">
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
                    onChange={handlePhotoChange}
                  />
                  {userData.photo ? (
                    <>
                      <img
                        src={URL.createObjectURL(userData.photo)}
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
              <div className="col-span-6 mb-3">
                <Label htmlFor="username" className="text-sm font-bold font-jakarta-sans pb-2">Nama Pengguna</Label>
                <Input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} />
              </div>
              <div className="col-span-6 mb-3">
                <Label htmlFor="fullName" className="text-sm font-bold font-jakarta-sans pb-2">Nama Lengkap</Label>
                <Input type="text" id="fullName" name="fullName" value={userData.fullName} onChange={handleInputChange} />
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="password" className="text-sm font-bold font-jakarta-sans pb-2">Password</Label>
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
                <Label htmlFor="email" className="text-sm font-bold font-jakarta-sans pb-2">Email</Label>
                <Input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} />
              </div>
              <div className="col-span-6 mb-3">
                <Label htmlFor="phoneNumber" className="text-sm font-bold font-jakarta-sans pb-2">Nomor Telepon</Label>
                <Input type="tel" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} />
              </div>
              <div className="col-span-12 mb-3">
                <Label className="text-sm font-bold font-jakarta-sans pb-2">Jenis Kelamin</Label>
                <RadioGroup
                  value={userData.gender}
                  onValueChange={value => setUserData(prevState => ({ ...prevState, gender: value }))}
                >
                  <div className="flex items-center">
                    <div className="pr-6 flex items-center">
                      <RadioGroupItem value="Laki-laki" id="male" />
                      <Label className="ml-2" htmlFor="male">Laki-Laki</Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="Perempuan" id="female" />
                      <Label className="ml-2" htmlFor="female">Perempuan</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="col-span-6">
                <Label htmlFor="city" className="text-sm font-bold font-jakarta-sans pb-2">Kota/Kabupaten</Label>
                <Input type="text" id="city" name="city" value={userData.city} onChange={handleInputChange} />
              </div>
              <div className="col-span-6">
                <Label htmlFor="province" className="text-sm font-bold font-jakarta-sans pb-2">Provinsi</Label>
                <Input type="text" id="province" name="province" value={userData.province} onChange={handleInputChange} />
              </div>
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
      </div>
    </div>
  );
}
