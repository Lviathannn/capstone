import { axiosInstance } from "@/lib/axios";

export const deleteUsers = async (token, id) => {
  try {
    console.log(`Menghapus user dengan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.delete(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data yang terhapus: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error delete users:", error); // Logging untuk debug
    throw new Error("Failed to delete users");
  }
};