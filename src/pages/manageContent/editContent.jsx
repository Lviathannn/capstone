import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Preview from "@/assets/img/preview-video.png";
import { useForm } from 'react-hook-form';
import { updateContent } from '@/services/manageContent/updateContent';
import { getContentById } from '@/services/manageContent/getContentById';
import { getDestination } from '@/services/manageContent/getDestination';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Dialog from "@/components/features/alert/Dialog";
import Notification from "@/components/features/alert/Notification";
import Edit from "@/assets/ImgModal/Ilustrasi-edit.svg";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import { privateRoutes } from '@/constant/routes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const useGetDestination = () => {
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

const useGetContentId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const { data, isLoading, error } = useQuery({
    queryKey: ["content", id],
    queryFn: () => getContentById(token, id),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, isLoading, error };
};

export default function EditContent() {
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { content } = state || {};
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.user?.access_token);
  const { id } = useParams();
  const { data, isLoading } = useGetContentId(id);
  const { data: destinationsData, error: destinationsError, isLoading: isLoadingDestinations } = useGetDestination();
  const [contentUrl, setContentUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination_id: "",
      url: "",
      title: "",
    },
  });

  useEffect(() => {
    const url = form.watch("url");
    setContentUrl(url);

    if (url) {
      if (url.match(/\.(jpg|jpeg|png)$/i)) {
        setContentType('image');
      } else if (url.match(/\.(mp4|avi|mov|mkv|video|hevc|webm)$/i)) {
        setContentType('video');
      } else {
        setContentType('other');
      }
    } else {
      setContentType('');
    }
  }, [form.watch("url")]);

  useEffect(() => {
    if (data) {
      form.reset({
        destination_id: data?.destination?.id || "",
        url: data?.data?.url || "",
        title: data?.data?.title || "",
      });
    }
  }, [data, form]);

  const createUpdateMutation = useMutation({
    mutationFn: (values) => {
      console.log("Updating content with ID:", id);
      console.log("Values being updated:", values);
      return updateContent(token, id, {...values, type: contentType });
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["content", id]);
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
        navigate(privateRoutes.CONTENT);
      }, 2000);
    },
    onError: () => {
      setIsError(true);
      toast.error("Update data gagal dilakukan");
    },
  });

  const onSubmit = async (values) => {
    const updatedValues = {
      ...values,
      destination_id: form.getValues("destination_id"),
      type: contentType,
    };
    form.setValue("destination_id", updatedValues.destination_id);
    form.setValue("title", updatedValues.title);
    console.log("Data yang akan dikirim ke backend:", updatedValues);
    await createUpdateMutation.mutateAsync(updatedValues);
  };

  return (
    <ProtectedLayout>
      <Form {...form}>
        <div className="flex flex-col px-10 py-6 bg-primary-50 h-full">
          <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-6">
            <div>
              <h1 className="text-[26px] font-bold text-neutral-800 font-jakarta-sans">
                {isLoading ? (
                  <Skeleton className="mb-3 h-5 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Edit Konten"
                )}
              </h1>
              <p className="text-base font-medium text-neutral-700 font-jakarta-sans">
                {isLoading ? (
                  <Skeleton className="my-3 h-3 w-full bg-gradient-to-r from-neutral-200 to-neutral-50/0 file:rounded-full" />
                ) : (
                  "Edit detail data konten video"
                )}
              </p>
            </div>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10">
            <div className="col-span-2 flex justify-center items-start">
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
                <img src={Preview} alt="Preview" className="w-auto h-auto object-cover" style={{ aspectRatio: '16/9' }} />
              )}
            </div>
            <div className="col-span-10 gap-4">
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="destination_id" className="text-sm font-bold font-jakarta-sans pb-2">
                  {isLoadingDestinations ? (
                    <Skeleton className="h-4 w-[150px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                  ) : (
                    "Nama Destinasi"
                  )}
                </Label>
                {isLoadingDestinations ? (
                  <Skeleton className="h-10 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  <Select
                    onValueChange={(value) => {
                      form.setValue("destination_id", value);
                    }}
                    value={form.watch("destination_id")}
                    disabled={isLoadingDestinations}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Masukkan Nama Destinasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinationsData &&
                        destinationsData.data &&
                        destinationsData.data.map((destination) => (
                          <SelectGroup key={destination.id}>
                            <SelectLabel>{destination.alamat.kota}</SelectLabel>
                            <SelectItem key={destination.id} value={destination.id}>
                              {destination.nama}
                            </SelectItem>
                          </SelectGroup>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="description" className="text-sm font-bold font-jakarta-sans pb-2">
                  {isLoading ? (
                    <Skeleton className="h-4 w-[120px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                  ) : (
                    "Deskripsi Konten"
                  )}
                </Label>
                {isLoading ? (
                  <Skeleton className="h-24 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  <textarea
                    id="description"
                    name="title"
                    placeholder='Masukkan Deskripsi Konten'
                    ref={textareaRef}
                    className="w-full h-auto resize-none rounded-[10px] p-2 overflow-hidden flex border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                    {...form.register("title")}
                  />
                )}
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="link" className="text-sm font-bold font-jakarta-sans pb-2">
                  {isLoading ? (
                    <Skeleton className="h-4 w-[100px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                  ) : (
                    "Link Terkait"
                  )}
                </Label>
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  <Input type="text" id="link" name="url" placeholder='Masukkan Link Video' {...form.register("url")} />
                )}
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
              {isLoading ? (
                <Skeleton className="h-4 w-[60px] rounded-full bg-gradient-to-r from-neutral-200" />
              ) : (
                "Kembali"
              )}
            </Button>
            <Dialog
              action={form.handleSubmit(onSubmit)}
              title="Simpan Perubahan !"
              description="Pastikan perubahan Anda benar. Yakin ingin mengubah dan menyimpan data ini?"
              textSubmit="Simpan"
              textCancel="Periksa Kembali"
              img={Edit}
            >
              <button
                className={`rounded-lg border border-primary-500 bg-primary-500 px-7 py-2 text-sm  font-medium text-neutral-50`}
              >
                {isLoading ? (
                  <Skeleton className="h-4 w-[30px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Edit"
                )}
              </button>
            </Dialog>
          </div>
        <Notification
          title={isSuccess ? "Sukses !" : "Gagal !"}
          description={
            isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
          }
          open={isSuccess || isError}
          type={isSuccess ? "success" : "error"}
        />
        </div>
      </Form>
    </ProtectedLayout>
  );
}