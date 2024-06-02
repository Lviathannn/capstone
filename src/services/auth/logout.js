import { axiosInstance } from "@/lib/axios";

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/admin/auth/logout");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
