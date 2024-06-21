import { axiosInstance } from "@/lib/axios";

export const getUserById = async (token, id) => {
  try {
    console.log(`Fetching ID: ${id}, using token: ${token}`);
    const res = await axiosInstance.get(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data retrieved: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response || error.message || error);
    throw new Error("Failed to get user data by ID");
  }
};