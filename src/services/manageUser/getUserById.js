import { axiosInstance } from "@/lib/axios";

export const getUserById = async (token, id) => {
  try {
    const res = await axiosInstance.get(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response || error.message || error,
    );
    throw new Error("Failed to get user data by ID");
  }
};
