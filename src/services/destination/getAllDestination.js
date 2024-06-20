import { axiosInstance } from "@/lib/axios";

export const getAllDestination = async (token, page, search) => {
  return await axiosInstance.get(
    `/admin/destinations?page=${page}&limit=8&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
