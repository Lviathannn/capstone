import { axiosInstance } from "@/lib/axios";

export const getFacilities = async (token) => {
  return await axiosInstance.get(`/admin/master-data/facilities`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
