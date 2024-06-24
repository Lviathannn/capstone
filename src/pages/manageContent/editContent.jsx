import { useState, useRef, useEffect } from 'react';
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
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

export default function EditContent() {
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [userContent, setUserContent] = useState({
    namaDestinasi: '',
    deskripsiKonten: '',
    linkTerkait: '',
    video: null
  });

  {/* setting auto-height Input Deskripsi */}
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
          <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-6">
            <div>
                <h1 className="text-[26px] font-bold text-neutral-800 font-jakarta-sans">Edit Konten</h1>
                <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Edit detail data konten video</p>
            </div>
          </div>
          <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10">
          <div className="col-span-2 flex justify-center items-start">
              <div>
                <img src={Preview} alt="Alert Add" className="w-auto h-auto" />
              </div>
          </div>
            <div className="col-span-10 gap-4">
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
                  className="w-full h-auto resize-none rounded-[10px] p-2 overflow-hidden flex border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
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
                    Tambah Data!
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm font-medium text-neutral-600 font-jakarta-sans text-center">
                    Pastikan informasi benar dan sesuai sebelum menambahkan data. Yakin ingin menambahkan data ini?
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