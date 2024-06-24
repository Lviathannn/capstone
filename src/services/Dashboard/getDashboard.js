import { axiosInstance } from "@/lib/axios";

export const getDashboard = async (token) => {
  try {
    const res = await axiosInstance.get(`admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error); // Logging untuk debug
    throw new Error("Failed to fetch users");
  }
};