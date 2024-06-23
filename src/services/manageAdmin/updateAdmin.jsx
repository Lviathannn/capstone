import { axiosInstance } from "@/lib/axios";

export const updateAdmins = async (token, id, newData) => {
  try {
<<<<<<< HEAD:src/services/manageAdmin/updateAdmin.js
    const res = await axiosInstance.put(`admin/admins/${id}`, newData, {
=======
    console.log(`mendapatkan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.put(`admin/admins/${id}`,newData,{
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f:src/services/manageAdmin/updateAdmin.jsx
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Data yang terupdate: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error data admins:", error); // Logging untuk debug
    throw new Error("Failed to update data admins");
  }
};
