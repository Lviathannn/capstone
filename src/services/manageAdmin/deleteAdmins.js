import { axiosInstance } from "@/lib/axios";

export const deleteAdmins = async (token, id) => {
  try {
    const res = await axiosInstance.delete(`admin/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error delete admins:", error); // Logging untuk debug
    throw new Error("Failed to delete admins");
  }
};
