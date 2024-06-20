import { axiosInstance } from "@/lib/axios";

export const deleteDestination = async (token, id) => {
  return await axiosInstance.delete(`/admin/destinations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
