import { axiosInstance } from "@/lib/axios";

export const getUsers = async (token, page, search) => {
  try {
    const res = await axiosInstance.get(`admin/users?page=${page}&limit=10&search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};