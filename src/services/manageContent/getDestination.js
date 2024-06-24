import { axiosInstance } from "@/lib/axios";

/* For Dropdown */
export const getDestination = async (token) => {
  try {
    const res = await axiosInstance.get(`/admin/destinations`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error data destinasi:", error); // Logging untuk debug
    throw new Error("Gagal mendapatkan data destinasi");
  }
};
