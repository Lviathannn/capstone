import { axiosInstance } from "@/lib/axios";

export const getAllDestination = async (token, page) => {
  return await axiosInstance.get(`/admin/destinations?page=${page}&limit=8`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
