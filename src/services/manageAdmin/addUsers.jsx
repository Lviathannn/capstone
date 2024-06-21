import { axiosInstance } from "@/lib/axios";

export const addUsers = async (token, formData) => {
  try {
    const res = await axiosInstance.post(`admin/admins`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error); // Logging untuk debug
    throw new Error("Failed to fetch users");
  }
};
