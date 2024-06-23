import Spinner from "@/components/ui/Spinner";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCity } from "@/services/destination/getCity";
import { getDistrict } from "@/services/destination/getDistrict";
import { getProvince } from "@/services/destination/getProvince";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Address({ form }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const token = useSelector((state) => state?.auth?.user?.access_token);

  const provinceQuery = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const response = await getProvince(token);
      return response?.data;
    },
  });

  const CityQuery = useQuery({
    queryKey: ["cities", selectedProvince],
    queryFn: async () => {
      const response = await getCity(token, selectedProvince);
      return response?.data;
    },
  });

  const districtQuery = useQuery({
    queryKey: ["district", selectedCity],
    queryFn: async () => {
      const response = await getDistrict(token, selectedCity);
      return response?.data;
    },
  });

  return (
    <>
      <div className="grid w-full items-center gap-2">
        <Label className="text-xl font-bold">Alamat</Label>
        <div className="mt-2 grid w-full grid-cols-2 items-center gap-2">
          <FormField
            control={form.control}
            name="id_provinsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("id_kota", null);
                    form.setValue("id_kecamatan", null);
                    setSelectedProvince(value);
                    setSelectedCity(null);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Provinsi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinceQuery.isLoading && (
                      <div className="flex w-full justify-center py-10">
                        <Spinner />
                      </div>
                    )}

                    {provinceQuery?.data?.data?.map((province) => (
                      <SelectItem
                        value={province.provinsi_id}
                        key={province.provinsi_id}
                      >
                        {province.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id_kota"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kota</FormLabel>
                <Select
                  onValueChange={(value) => {
                    form.setValue("id_kecamatan", null);
                    setSelectedCity(value);
                    field.onChange(value);
                  }}
                  disabled={!selectedProvince}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kota" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CityQuery.isLoading && (
                      <div className="flex w-full justify-center py-10">
                        <Spinner />
                      </div>
                    )}
                    {CityQuery?.data?.data?.map((city) => (
                      <SelectItem value={city.kota_id} key={city.kota_id}>
                        {city.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id_kecamatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kecamatan</FormLabel>
                <Select
                  disabled={!selectedCity}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kecamatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districtQuery.isLoading && (
                      <div className="flex w-full justify-center py-10">
                        <Spinner />
                      </div>
                    )}
                    {districtQuery?.data?.data?.map((district) => (
                      <SelectItem
                        value={district.kecamatan_id}
                        key={district.kecamatan_id}
                      >
                        {district.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kode_pos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Pos</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="Masukkan Kode Pos"
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
        name="jalan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Jalan</FormLabel>
            <FormControl>
              <Input
                className="w-full"
                placeholder="Masukkan Nama Jalan"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
