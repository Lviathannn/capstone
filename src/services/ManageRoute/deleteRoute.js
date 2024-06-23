import { axiosInstance } from "@/lib/axios";

export const deleteRoutes = async (token,id) => {
  try {
    const res = await axiosInstance.delete(`admin/routes/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete routes");
  }
};