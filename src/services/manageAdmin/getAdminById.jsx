import { axiosInstance } from "@/lib/axios";

export const getAdminById = async (token, id) => {
  try {
<<<<<<< HEAD:src/services/manageAdmin/getAdminById.js
    const res = await axiosInstance.get(`admin/admins/${id}`, {
=======
    console.log(`mendapatkan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.get(`admin/admins/${id}`,{
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f:src/services/manageAdmin/getAdminById.jsx
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Data yang terambil: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error data admins:", error); // Logging untuk debug
    throw new Error("Failed to get data admins by ID");
  }
};
