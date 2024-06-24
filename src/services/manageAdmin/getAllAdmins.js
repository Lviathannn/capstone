import { axiosInstance } from "@/lib/axios";

export const getAllAdmins = async (token,page,search) => {
  try {
    const res = await axiosInstance.get(`admin/admins?page=${page}&limit=8&search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};