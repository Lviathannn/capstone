import { axiosInstance } from "@/lib/axios";

export const updateContent = async (token, id, data) => {
  try {
    const res = await axiosInstance.put(`/admin/destination-media/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Pastikan menggunakan 'application/json'
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data); // Log server response error
    } else {
      console.error("Error adding content:", error); // Log the original error
    }
    throw error; // Re-throw the original error
  }
};