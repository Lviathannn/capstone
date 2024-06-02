import { axiosInstance } from "@/lib/axios";

export const login = async (values) => {
  try {
    const res = await axiosInstance.post("/admin/auth/login", values);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data.message);
  }
};
