import { axiosInstance } from "@/lib/axios";

export const logout = async () => {
  try {
    const res = await axiosInstance.delete("/admin/auth/logout", {
      withCredentials: true,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
