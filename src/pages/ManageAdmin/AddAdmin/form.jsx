import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";
import { Label } from "@/components/ui/label";
import Visibility from "@/components/icons/Visibility";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addUsers } from "@/services/manageAdmin/addUsers";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";

export const FormAdd = () => {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.user?.access_token);
  console.log(token);
  const [formData, setFormData] = useState({
    username: "",
    password:"",
    foto:null
  });
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const createPostMutation = useMutation({
    mutationFn: (formData) => addUsers(token, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin']});
      toast.success("User added successfully");
      console.log("success bro!");
      setFormData({
        username: "",
        password:"",
        foto:null
      });
      navigate("/manage-admin");
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, foto: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  function handleSubmit() {
    console.log("hai");
    const newData = new FormData();
    newData.append('username', formData.username);
    newData.append('password', formData.password);
    if (formData.foto) {
      newData.append('foto', formData.foto);
    }
    createPostMutation.mutate(newData);
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex h-[476px] w-full items-center gap-10 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 shadow-md">
        <div className="relative rounded-full w-[212px] bg-neutral-200 ">
          <div className=" mx-auto">
            <img className="rounded-full w-[212px] h-[212px]" src={preview || DefaultPhoto} alt="photo" />
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
            onClick={handleClick}
            className="absolute left-0 top-0 rounded-full border-none bg-transparent hover:bg-transparent p-[108px] "
          ></Button>
        </div>
        <form action="" onSubmit={handleSubmit} className="mx-auto flex-1 flex  w-full flex-col gap-10">
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
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Masukan password admin"
                required
              />
              <Visibility className="absolute right-3 top-2" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-6">
        <Link to="/manage-admin"><Button className="border-primary-500 text-primary-500 hover:text-primary-500 h-[42px] w-[180px] border bg-white hover:bg-primary-50 text-sm font-medium sm:rounded-[12px]">
          Kembali
        </Button></Link>
        <AlertConfirm
        textBtn="Modal Add"
        img={Add}
        title="Tambah Admin?"
        desc="Sebelum menambahkan admin, pastikan informasi yang dimasukkan
        benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?"
        textDialogCancel="Batal"
        textDialogSubmit="Tambah"
        onConfirm={handleSubmit}
      ></AlertConfirm>
        
      </div>
        </form>
      </div>
      
    </div>
  );
};
