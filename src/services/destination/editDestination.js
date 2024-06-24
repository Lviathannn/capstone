import { axiosInstance } from "@/lib/axios";

export const editDestination = async (token, body, id) => {
  return await axiosInstance.put(`/admin/destinations/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
