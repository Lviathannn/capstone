import { axiosInstance } from "@/lib/axios";

export const addAdmins = async (token, values) => {
  try {
    const res = await axiosInstance.post(`admin/admins`, values, {
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
