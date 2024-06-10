import { axiosInstance } from "@/lib/axios";

export const deleteAdmins = async (token,id) => {
  try {
    console.log(`Menghapus admin dengan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.delete(`admin/admins/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data yang terhapus: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error delete admins:", error); // Logging untuk debug
    throw new Error("Failed to delete admins");
  }
};
