import { axiosInstance } from "@/lib/axios";

export const getContentById = async (token, id) => {
  try {
    const res = await axiosInstance.get(`/admin/destination-media/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res && res.data) {
      return res.data;
    } else {
      throw new Error("Response tidak mengandung data");
    }
  } catch (error) {
    console.error("Error data admins:", error); // Logging untuk debug
    throw new Error("Failed to get data admins by ID");
  }
};