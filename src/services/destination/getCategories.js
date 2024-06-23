import { axiosInstance } from "@/lib/axios";

export const getCategories = async (token) => {
  return await axiosInstance.get(`/admin/master-data/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
