import { axiosInstance } from "@/lib/axios";

export const getDistrict = async (token, city_id) => {
  return await axiosInstance.get(
    `/admin/master-data/subdistricts?city_id=${city_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
