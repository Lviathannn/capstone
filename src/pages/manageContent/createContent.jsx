import { useState, useRef, useEffect } from 'react';
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import AddPhoto from "@/assets/icons/add photo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import EditIcon from "@/assets/icons/edit photo.png";
import Preview from "@/assets/img/preview-video.png"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import AlertAdd from "@/assets/img/alert add.png";
import { AspectRatio } from '@radix-ui/themes';

export default function CreateContent() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [userContent, setUserContent] = useState({
    namaDestinasi: '',
    deskripsiKonten: '',
    linkTerkait: '',
    video: null
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userContent.deskripsiKonten]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserContent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setUserContent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setUserContent(prevState => ({
      ...prevState,
      video: file
    }));
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex flex-col px-10 py-6 bg-primary-50 h-full">
          <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-4">
            <div>
              <h1 className="text-[22px] font-bold text-neutral-800 font-jakarta-sans">Tambah Konten</h1>
              <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Tambah konten video</p>
            </div>
          </div>
          <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-4">
            <div className="col-span-2 flex justify-center items-start">
              <label htmlFor="photo" className="cursor-pointer">
                <div className="relative w-40 h-40 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden">
                  <input
                    type="file"
                    id="video"
                    name="video"
                    className="hidden"
                    onChange={handleVideoChange}
                  />
                  {userContent.video ? (
                    <>
                      <img
                        src={URL.createObjectURL(userContent.video)}
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
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="destinationName" className="text-sm font-bold font-jakarta-sans pb-2">Nama Destinasi</Label>
                <Input type="text" id="destinationName" name="namaDestinasi" placeholder='Masukkan Nama Destinasi' value={userContent.namaDestinasi} onChange={handleInputChange} />
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="description" className="text-sm font-bold font-jakarta-sans pb-2">Deskripsi Konten</Label>
                <textarea
                  id="description"
                  name="deskripsiKonten"
                  placeholder='Masukkan Deskripsi Konten'
                  value={userContent.deskripsiKonten}
                  onChange={handleInputChange}
                  ref={textareaRef}
                  className="w-full h-auto resize-none border border-gray-300 rounded-md p-2 overflow-hidden"
                />
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="link" className="text-sm font-bold font-jakarta-sans pb-2">Link Terkait</Label>
                <Input type="text" id="link" name="linkTerkait" placeholder='Masukkan Link Video' value={userContent.linkTerkait} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outlined"
              color="primary"
              className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mr-6"
              onClick={() => navigate('/manage-content')}
            >
              Kembali
            </Button>
            <AlertDialog>
              <AlertDialogTrigger className="border-primary-500 border px-7 py-1 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 text-center">
                Tambah
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="pb-6">
                  <div className="flex justify-center pb-6">
                    <img src={AlertAdd} alt="Alert Add" className="w-[240px] h-[100px]" />
                  </div>
                  <AlertDialogTitle className="text-lg font-bold text-neutral-900 font-jakarta-sans text-center pb-4">
                    Tambah Data?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm font-medium text-neutral-600 font-jakarta-sans text-center">
                    Sebelum menambahkan data, pastikan informasi yang dimasukkan benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center w-full">
                  <AlertDialogCancel className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mx-2 w-full text-center">
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction className="border-primary-500 border px-7 py-2 rounded-lg bg-neutral-50 text-primary-500 hover:bg-primary-500 hover:text-neutral-50 mx-2 w-full text-center">
                    Tambah
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </main>
      </div>
    </div>
  );
}
