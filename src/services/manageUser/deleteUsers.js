import { axiosInstance } from "@/lib/axios";

export const deleteUsers = async (token, id) => {
  try {
    const res = await axiosInstance.delete(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error delete users:", error); // Logging untuk debug
    throw new Error("Failed to delete users");
  }
};
