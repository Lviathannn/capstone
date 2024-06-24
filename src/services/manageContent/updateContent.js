import { axiosInstance } from "@/lib/axios";

export const updateContent = async (token, id, newData) => {
  try {
    const res = await axiosInstance.put(
      `/admin/destination-media/${id}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    "Data yang terupdate: ", res.data;
    return res.data;
  } catch (error) {
    console.error("Error data admins:", error); // Logging untuk debug
    throw new Error("Failed to update data admins");
  }
};
