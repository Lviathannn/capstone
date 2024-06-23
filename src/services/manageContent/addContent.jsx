import { axiosInstance } from "@/lib/axios";

export const addContent = async (token, formData) => {
  try {
    const res = await axiosInstance.post(`/admin/destination-media`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding content:", error); // Log the original error
    throw error; // Re-throw the original error
  }
};