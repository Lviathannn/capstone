import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/services/destination/getCategories";
import { useSelector } from "react-redux";
import { getFacilities } from "@/services/destination/getFacilities";
import ImageUploader from "./ImageUploader";
import Address from "./Address";
import AddImage from "@/assets/ImgModal/Ilustrasi-add.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createDestination } from "@/services/destination/createDestination";
import { postImage } from "@/services/destination/postImage";
import { toast } from "sonner";
import Dialog from "@/components/features/alert/Dialog";
import Notification from "@/components/features/alert/Notification";
import { privateRoutes } from "@/constant/routes";
import { destinationSchema } from "@/lib/schema";
import Spinner from "@/components/ui/Spinner";

export default function CreateDestination() {
  const [file1, setFile1] = useState({
    description: "",
    file: null,
  });
  const [file2, setFile2] = useState({
    description: "",
    file: null,
  });
  const [file3, setFile3] = useState({
    description: "",
    file: null,
  });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state?.auth?.user?.access_token);
  const queryClient = useQueryClient();
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories(token);
      return response?.data;
    },
  });
  const { data: facilities, isLoading: facilitiesLoading } = useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      const response = await getFacilities(token);
      return response?.data;
    },
  });
  const destinationMutation = useMutation({
    mutationFn: async (body) => await createDestination(token, body),
    onSuccess: async (res) => {
      setIsSuccess(true);
      if (file1?.file) {
        try {
          await postImage(token, {
            destination_id: res?.data?.data?.id,
            file: file1?.file[0],
            title: file1?.description || "Gambar 1",
          });
        } catch {
          toast.error("Gagal mengunggah gambar");
        }
      }
      if (file2?.file) {
        try {
          await postImage(token, {
            destination_id: res?.data?.data?.id,
            file: file2?.file[0],
            title: file2?.description || "Gambar 2",
          });
        } catch {
          toast.error("Gagal mengunggah gambar");
        }
      }
      if (file3?.file) {
        try {
          await postImage(token, {
            destination_id: res?.data?.data?.id,
            file: file3?.file[0],
            title: file3?.description || "Gambar 3",
          });
        } catch {
          toast.error("Gagal mengunggah gambar");
        }
      }
    },
    onError: () => {
      setIsError(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
      });
      setTimeout(() => {
        setIsError(false);
        setIsSuccess(false);
        navigate(privateRoutes.DESTINATION);
      }, 2000);
    },
  });
  const form = useForm({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      fasilitas: [],
    },
  });

  function onSubmit(values) {
    const body = {
      nama_destinasi: values.nama_destinasi,
      deskripsi: values.deskripsi,
      jam_buka: values.jam_buka,
      jam_tutup: values.jam_tutup,
      harga_masuk: Number(values.harga_masuk),
      id_kategori: values.id_kategori,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      fasilitas: values.fasilitas,
      alamat_destinasi: {
        id_provinsi: values.id_provinsi,
        id_kota: values.id_kota,
        id_kecamatan: values.id_kecamatan,
        jalan: values.jalan,
        kode_pos: values.kode_pos,
      },
    };
    destinationMutation.mutate(body);
  }

  return (
    <ProtectedLayout>
      <section
        className="w-full space-y-6 rounded-tl-2xl bg-primary-50 p-6 pb-10"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="flex w-full items-center justify-between rounded-xl bg-neutral-50 p-6 shadow-md">
          <div className="">
            <h1 className="text-2xl font-bold text-neutral-800">
              Detail Destinasi
            </h1>
            <p className="text-neutral-700">
              Lihat detail data destinasi yang tersedia
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <div className="w-full rounded-xl bg-neutral-50 p-5 shadow-md">
              {/* Image List */}
              <p className="mb-2 text-xs text-neutral-500">
                * Maximum size 2 mb
              </p>
              <ImageUploader
                file1={file1}
                file2={file2}
                file3={file3}
                setFile1={setFile1}
                setFile2={setFile2}
                setFile3={setFile3}
              />
              {/* Form */}

              <div className="mt-5 w-full space-y-4">
                <FormField
                  control={form.control}
                  name="nama_destinasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Masukkan Nama Destinasi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="id_kategori"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {categoriesLoading && <Spinner />}
                          {categories?.data?.map((category) => (
                            <FormItem
                              className="flex items-center space-x-3 space-y-0"
                              key={category.kategori_id}
                            >
                              <FormControl>
                                <RadioGroupItem value={category.kategori_id} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {category.nama}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Address form={form} />
              </div>
            </div>

            <div className="w-full rounded-xl bg-neutral-50 p-5 shadow-md">
              <div className="mt-5 w-full space-y-4">
                <FormField
                  required
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan Deskripsi Destinasi"
                          className="min-h-40 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid w-full items-center gap-2">
                  <Label className="text-xl font-bold">Jam Operasional</Label>
                  <div className="mt-2 grid w-full grid-cols-2 items-center gap-2">
                    <FormField
                      control={form.control}
                      name="jam_buka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Buka</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="Masukkan Jam Buka"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jam_tutup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tutup</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="Masukkan Jam Tutup"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="harga_masuk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="w-full"
                            placeholder="Masukkan Biaya"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <Label className="text-xl font-bold">Lokasi Destinasi</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="w-full"
                              placeholder="Masukkan Latitude"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="w-full"
                              placeholder="Masukkan Longitude"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="fasilitas"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Fasilitas</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {facilitiesLoading && <Spinner />}

                        {facilities?.data?.map((facility) => (
                          <FormField
                            key={facility.fasilitas_id}
                            control={form.control}
                            name="fasilitas"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={facility.fasilitas_id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field?.value?.includes(
                                        facility?.fasilitas_id,
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              facility.fasilitas_id,
                                            ])
                                          : field.onChange(
                                              field?.value?.filter(
                                                (value) =>
                                                  value !==
                                                  facility?.fasilitas_id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {facility.nama}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="col-start-2 flex w-full justify-end gap-3">
              <Button
                className="text-primary"
                size="lg"
                variant="outline"
                onClick={() => {
                  navigate("/destination");
                }}
              >
                Kembali
              </Button>
              <div className="">
                <Dialog
                  title="Tambah Data !"
                  description="Pastikan informasi benar dan sesuai sebelum menambahkan data. Yakin ingin menambahkan data ini?"
                  action={form.handleSubmit(onSubmit)}
                  img={AddImage}
                  textSubmit="Tambah"
                  textCancel="Batal"
                >
                  <Button
                    size="lg"
                    type="button"
                    disabled={destinationMutation.isLoading}
                  >
                    {destinationMutation.isLoading
                      ? "Menambahkan..."
                      : "Tambah"}
                  </Button>
                </Dialog>
              </div>
              {isSuccess && (
                <Notification
                  open={isSuccess}
                  title="Sukses!"
                  description="Proses berhasil dilakukan."
                  type="success"
                />
              )}

              {isError && (
                <Notification
                  open={isError}
                  title="Gagal!"
                  description="Proses gagal dilakukan."
                />
              )}
            </div>
          </form>
        </Form>
      </section>
    </ProtectedLayout>
  );
}
