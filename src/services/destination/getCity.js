import { axiosInstance } from "@/lib/axios";

export const getCity = async (token, province_id) => {
  return await axiosInstance.get(
    `/admin/master-data/cities?province_id=${province_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
