import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/assets/img/preview-video.png";
import AlertAdd from "@/assets/img/alert add.png";
import ReactPlayer from 'react-player';
import { addContent } from '@/services/manageContent/addContent';
import { getDestination } from '@/services/manageContent/getDestination';
import { AlertConfirm } from '@/components/features/alert/alertConfirm';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import { privateRoutes } from "@/constant/routes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const useGetDestination = () => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const { data, error, isLoading } = useQuery({
    queryKey: ["destination"],
    queryFn: () => getDestination(token),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

const formSchema = z.object({
  destination_id: z.string().nonempty("Destination is required"),
  url: z.string().url("Invalid URL format"),
  title: z.string().nonempty("Title is required"),
});

export default function CreateContent() {
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.user?.access_token);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [contentUrl, setContentUrl] = useState('');
  const [contentType, setContentType] = useState('');

  const { data: destinationsData, error: destinationsError, isLoading: destinationsLoading } = useGetDestination();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination_id: "",
      url: "",
      title: "",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (values) => addContent(token, { ...values, type: contentType }),
    onSuccess: () => {
      queryClient.invalidateQueries(["content"]);
      toast.success("Content added successfully");
      form.reset();
      navigate(privateRoutes.CONTENT);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add content");
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [form.watch("title")]);

  useEffect(() => {
    const url = form.watch("url");
    setContentUrl(url);

    if (url) {
      if (url.match(/\.(jpg|jpeg|png)$/i)) {
        setContentType('photo');
      } else if (url.match(/\.(mp4|avi|mov|mkv|video|hevc|webm)$/i)) {
        setContentType('video');
      } else {
        setContentType('other');
      }
    } else {
      setContentType('');
    }
  }, [form.watch("url")]);

  const onSubmit = (values) => {
    try {
      console.log('Submitting form data:', values);

      const dataToSend = { ...values, type: contentType };
      console.log('Data yang akan dikirim ke backend:', dataToSend);
  
      createPostMutation.mutate(dataToSend);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add content");
    }
  };

  return (
    <ProtectedLayout>
      <main className="flex flex-col px-10 py-6 bg-primary-50 h-full">
        <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-neutral-800 font-jakarta-sans">Tambah Konten</h1>
            <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Tambah konten video</p>
          </div>
        </div>
        <form
          className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-2 flex justify-center items-start">
            <div className='flex flex-col justify-center items-center gap-1'>
              <p className="text-lg font-bold font-jakarta-sans">Preview</p>
              <div>
                {contentUrl ? (
                  contentUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img src={contentUrl} alt="Preview" className="w-auto h-auto object-cover" />
                  ) : (
                    <ReactPlayer
                      url={contentUrl}
                      width="100%"
                      height="100%"
                      controls={true}
                      className="react-player"
                    />
                  )
                ) : (
                  <img src={Preview} alt="Alert Add" className="w-auto h-auto object-cover" style={{ aspectRatio: '16/9' }} />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-10 gap-4">
            <div className="col-span-12 mb-3 relative">
              <Label htmlFor="destination_id" className="text-sm font-bold font-jakarta-sans pb-2">Nama Destinasi</Label>
              <Select
                {...form.register("destination_id", {
                  required: true,
                })}
                onValueChange={(value) => form.setValue("destination_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Masukkan Nama Destinasi" />
                </SelectTrigger>
                <SelectContent>
                  {destinationsData && destinationsData.data && destinationsData.data.map(destination => (
                    <SelectGroup key={destination.id}>
                      <SelectLabel>{destination.alamat.kota}</SelectLabel>
                      <SelectItem key={destination.id} value={destination.id}>
                        {destination.nama}
                      </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-12 mb-3 relative">
              <Label htmlFor="title" className="text-sm font-bold font-jakarta-sans pb-2">Deskripsi Konten</Label>
              <textarea
                id="title"
                placeholder='Masukkan Deskripsi Konten'
                ref={textareaRef}
                className="w-full h-auto resize-none rounded-[10px] p-2 overflow-hidden flex border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register("title")}
              />
            </div>
            <div className="col-span-12 mb-3 relative">
              <Label htmlFor="url" className="text-sm font-bold font-jakarta-sans pb-2">Link Terkait</Label>
              <Input
                id="url"
                type="text"
                placeholder='Masukkan Link Video'
                {...form.register("url")}
              />
            </div>
          </div>
        </form>
        <div className="mt-4 flex justify-end">
          <Button
            variant="outlined"
            color="primary"
            className="mr-6 rounded-lg border border-primary-500 bg-neutral-50 px-7 py-2 text-primary-500 hover:bg-primary-500 hover:text-neutral-50"
            onClick={() => navigate(privateRoutes.CONTENT)}
          >
            Kembali
          </Button>
          <AlertConfirm
            textBtn="Tambah"
            img={AlertAdd}
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
      </main>
    </ProtectedLayout>
  );
}
