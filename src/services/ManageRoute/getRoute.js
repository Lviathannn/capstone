import { axiosInstance } from "@/lib/axios";

export const getRoutes = async (token,page,search) => {
  try {
    const res = await axiosInstance.get(`/admin/routes?page=${page}&limit=8&search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching routes:", error); // Logging untuk debug
    throw new Error("Failed to fetch routes");
  }
};