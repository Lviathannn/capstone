import { axiosInstance } from "@/lib/axios";

export const deleteAdmins = async (token, id) => {
  try {
<<<<<<< HEAD:src/services/manageAdmin/deleteAdmins.js
    const res = await axiosInstance.delete(`admin/admins/${id}`, {
=======
    console.log(`Menghapus admin dengan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.delete(`admin/admins/${id}`,{
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f:src/services/manageAdmin/deleteAdmins.jsx
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
