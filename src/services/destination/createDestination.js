import { axiosInstance } from "@/lib/axios";

export const createDestination = async (token, body) => {
  return await axiosInstance.post(`/admin/destinations`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
