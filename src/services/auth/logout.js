import { axiosInstance } from "@/lib/axios";

export const logout = async () => {
  try {
    await axiosInstance.delete("/admin/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
