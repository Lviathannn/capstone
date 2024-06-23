import { axiosInstance } from "@/lib/axios";

export const getProvince = async (token) => {
  return await axiosInstance.get(`/admin/master-data/provinces`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
