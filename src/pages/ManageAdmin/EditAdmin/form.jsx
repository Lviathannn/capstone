import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";
import { Label } from "@/components/ui/label";
import Visibility from "@/components/icons/Visibility";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAdminById } from "@/services/manageAdmin/getAdminById";
import editPhoto from "@/assets/ImgModal/Ilustrasi-add.svg";
import { updateAdmins } from "@/services/manageAdmin/updateAdmin";
import Edit from "@/assets/ImgModal/Ilustrasi-edit.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";

export const useGetAdminId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin", id],
    queryFn: () => getAdminById(token, id),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

export const FormEdit = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { data, error, isLoading } = useGetAdminId(id);
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.user?.access_token);
  console.log(token);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    foto: null,
  });
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData({
        username: data?.data?.username || "",
        password: "", // Leave password empty initially for security reasons
        foto: data?.data?.foto_profil || null, // Leave foto empty initially
      });
      if (data?.data?.foto_profil) {
        setPreview(data?.data?.foto_profil);
      }
    }
    console.log(formData);
  }, [data]);

  const createUpdateMutation = useMutation({
    mutationFn: (newData) => updateAdmins(token, id, newData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("User update successfully");
      console.log("success bro!");
      setFormData({
        username: "",
        password: "",
        foto: formData.foto || data?.data?.foto_profil,
      });
    },
  });

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, foto: file });
      setPreview(URL.createObjectURL(file));
    }
    console.log(formData.foto);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: e.target.value,
    }));
    console.log(formData);
  };

  function handleSubmit(e) {

    const newData = new FormData();
    console.log(formData.username);
    console.log(formData.password);
    console.log(formData.foto);
    newData.append("username", formData.username);
    if (formData.password) {
      newData.append("password", formData.password);
    }
    if (formData.foto instanceof File) {
      newData.append("foto", formData.foto);
    } else if (typeof formData.foto === "string") {
      newData.append("fotoUrl", formData.foto);
    }
    for (let pair of newData.entries()) {
      console.log(
        `${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`,
      );
    }
    // Additional log to check the exact content type and structure
    console.log("Submitting FormData:", newData);

    createUpdateMutation.mutate(newData);
    navigate("/manage-admin");
  }

  console.log(data?.data?.username);
  console.log(data?.data?.foto_profil);
  console.log(data?.data?.password);
  console.log(data?.data?.tanggal_pembuatan);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex h-[476px] w-full items-center gap-10 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 shadow-md">
        <div className="relative w-[212px] rounded-full bg-neutral-200">
          <div className=" mx-auto">
            <img
              className="h-[212px] w-[212px] rounded-full"
              src={preview || DefaultPhoto}
              alt="photo"
            />
          </div>
          <div className="absolute left-0 top-0 rounded-full ">
            <Input
              type="file"
              ref={fileInputRef}
              name="foto"
              onChange={handleFileChange}
              className="mx-auto hidden rounded-full border-none bg-transparent"
            ></Input>
          </div>
          <Button
            onClick={handleClick}
            className="absolute left-0 top-0 h-full w-full rounded-full border-none bg-transparent hover:bg-neutral-50/50 "
          ></Button>
        </div>
        <form
          onSubmit={handleSubmit}
          action=""
          className="mx-auto flex  w-full flex-1 flex-col gap-10"
        >
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label
                htmlFor="username"
                className="font-jakarta-sans text-sm font-bold text-neutral-900"
              >
                Username
              </Label>
            </div>
            <div className="w-full">
              <Input
                className=" border-solid-1 font-jakarta-sans rounded-[10px] bg-white px-[12px] py-5 text-sm font-normal text-neutral-700"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                
                placeholder="Masukan nama admin"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label
                htmlFor="password"
                className="font-jakarta-sans text-sm font-bold text-neutral-900"
              >
                Password
              </Label>
            </div>
            <div className="relative h-12 w-full">
              <Input
                className="border-solid-1 font-jakarta-sans absolute rounded-[10px] bg-white px-[12px] py-5 text-sm font-normal text-neutral-700"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukan password admin"
              />
              <Visibility className="absolute right-3 top-2" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-6">
            <Button className="border-primary-500 text-primary-500 hover:text-primary-500 h-[42px] w-[180px] border bg-white text-sm font-medium sm:rounded-[12px]">
              Kembali
            </Button>
            <AlertConfirm
        textBtn="Modal Edit"
        img={Edit}
        title="Edit Admin?"
        desc="Sebelum mengedit admin, pastikan informasi yang dimasukkan benar
        dan sesuai. Apakah Anda yakin ingin mengedit data ini?"
        textDialogCancel="Periksa Kembali"
        textDialogSubmit="Simpan"
        onConfirm={handleSubmit}
      ></AlertConfirm>
            
          </div>
        </form>
      </div>
    </div>
  );
};
