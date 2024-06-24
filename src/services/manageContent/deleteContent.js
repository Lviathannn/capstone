import { axiosInstance } from "@/lib/axios";

export const deleteContent = async (token, id) => {
  try {
    const res = await axiosInstance.delete(`/admin/destination-media/${id}`, {
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
