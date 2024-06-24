import { axiosInstance } from "@/lib/axios";

export const getAdminById = async (token, id) => {
  try {
    const res = await axiosInstance.get(`admin/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error data admins:", error); // Logging untuk debug
    throw new Error("Failed to get data admins by ID");
  }
};
