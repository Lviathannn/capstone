import { axiosInstance } from "@/lib/axios";

export const getDestination = async (token, id) => {
  return await axiosInstance.get(`/admin/destinations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
