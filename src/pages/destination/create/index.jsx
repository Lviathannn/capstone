import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Uploader from "@/components/features/uploader/Uploader";
import Thumbnail from "@/components/features/uploader/Thumbnail";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateDestination() {
  const navigate = useNavigate();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

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
          <Button
            onClick={() => {
              navigate("/destination");
            }}
          >
            Kembali
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="w-full rounded-xl bg-neutral-50 p-5 shadow-md">
            {/* Image List */}
            <p className="mb-2 text-xs text-neutral-500">* Maximum size 2 mb</p>
            <div className="grid grid-cols-1 justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
              {file1 ? (
                <div className="w-full">
                  <Thumbnail
                    setFile={setFile1}
                    url={URL.createObjectURL(file1[0])}
                    onDelete={() => {
                      setFile1(null);
                    }}
                  />
                  <Input
                    className="mt-2 h-8 rounded-md"
                    placeholder="Gambar 1 : Sampul"
                  />
                </div>
              ) : (
                <div className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center">
                  <Uploader setFile={setFile1} />
                  <p className="mt-2 text-xs text-neutral-400">Upload Foto 1</p>
                </div>
              )}

              {file2 ? (
                <div className="w-full">
                  <Thumbnail
                    setFile={setFile2}
                    url={URL.createObjectURL(file2[0])}
                    onDelete={() => {
                      setFile2(null);
                    }}
                  />

                  <Input
                    className="mt-2 h-8 rounded-md"
                    placeholder="Gambar 2"
                  />
                </div>
              ) : (
                <div className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center">
                  <Uploader setFile={setFile2} />
                  <p className="mt-2 text-xs text-neutral-400">Upload Foto 2</p>
                </div>
              )}

              {file3 ? (
                <div className="w-full">
                  <Thumbnail
                    setFile={setFile3}
                    url={URL.createObjectURL(file3[0])}
                    onDelete={() => {
                      setFile3(null);
                    }}
                  />
                  <Input
                    className="mt-2 h-8 rounded-md"
                    placeholder="Gambar 3"
                  />
                </div>
              ) : (
                <div className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center">
                  <Uploader setFile={setFile3} />
                  <p className="mt-2 text-xs text-neutral-400">Upload Foto 3</p>
                </div>
              )}
            </div>
            {/* Form */}

            <div className="mt-5 w-full space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label className="font-bold">Nama</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Masukkan Nama Destinasi"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label className="font-bold">Kategori</Label>
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Alam</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Seni & Budaya</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Sejarah</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label className="text-xl font-bold">Alamat</Label>
                <div className="mt-2 grid w-full grid-cols-2 items-center gap-2">
                  <div className="space-y-2">
                    <Label className="font-bold">Provinsi</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Masukkan Provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Kota/Kabupaten</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Masukkan Kota/Kabupaten" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Kecamatan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Masukkan Kecamatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Kode Pos</Label>
                    <Input className="w-full" placeholder="Masukkan Kode Pos" />
                  </div>
                </div>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label className="font-bold">Nama Jalan</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Masukkan Nama Jalan"
                />
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-neutral-50 p-5 shadow-md">
            <div className="mt-5 w-full space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label className="font-bold">Deskripsi</Label>
                <Textarea
                  type="text"
                  className="min-h-32 w-full"
                  placeholder="Masukkan Deskripsi Destinasi"
                />
              </div>

              <div className="grid w-full items-center gap-2">
                <Label className="text-xl font-bold">Jam Operasional</Label>
                <div className="mt-2 grid w-full grid-cols-2 items-center gap-2">
                  <div className="space-y-2">
                    <Label className="font-bold">Buka</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Masukkan Jam Buka"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Tutup</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Masukkan Jam Tutup"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Biaya</Label>
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="Masukkan Biaya"
                  />
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label className="font-bold">Fasilitas</Label>
                <div
                  className="grid w-full grid-cols-2 gap-2
                "
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Area Makan
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
}
