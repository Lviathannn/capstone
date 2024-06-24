import { axiosInstance } from "@/lib/axios";

export const updateAdmins = async (token, id, newData) => {
  try {
    const res = await axiosInstance.put(`admin/admins/${id}`, newData, {
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
