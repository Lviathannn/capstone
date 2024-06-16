import { axiosInstance } from "@/lib/axios";

export const getUsers = async (token,page) => {
  try {
    const res = await axiosInstance.get(`admin/users?page=${page}`, {
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