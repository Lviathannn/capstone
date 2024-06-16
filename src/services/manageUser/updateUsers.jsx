import { axiosInstance } from "@/lib/axios";

export const updateUsers = async (token,id,newData) => {
  try {
    console.log(`mendapatkan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.put(`admin/users/${id}`,newData,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Data yang terupdate: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error data users:", error); // Logging untuk debug
    throw new Error("Failed to update data users");
  }
};