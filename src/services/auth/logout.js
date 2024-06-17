import { axiosInstance } from "@/lib/axios";

export const logout = async () => {
  try {
    await axiosInstance.delete("/admin/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    // throw new Error(error.response.data.message);
  }
};
