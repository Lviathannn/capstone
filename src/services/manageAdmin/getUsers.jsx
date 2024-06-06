import { axiosInstance } from "@/lib/axios";

export const getUsers = async (token) => {
  try {
    const res = await axiosInstance.get("admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetching Data: ", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching users:", error); // Logging untuk debug
    throw new Error("Failed to fetch users");
  }
};
