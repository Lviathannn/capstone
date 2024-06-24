import { axiosInstance } from "@/lib/axios";

export const getRouteById = async (token,id) => {
  try {
    console.log(`mendapatkan ID: ${id}, menggunakan token: ${token}`);
    const res = await axiosInstance.get(`admin/routes/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data yang terambil: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error data admins:", error); // Logging untuk debug
    throw new Error("Failed to get data admins by ID");
  }
};