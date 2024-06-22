import { axiosInstance } from "@/lib/axios";

export const getRouteById = async (token,id) => {
  try {
    const res = await axiosInstance.get(`admin/routes/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error data routes:", error); // Logging untuk debug
    throw new Error("Failed to get data routes by ID");
  }
};