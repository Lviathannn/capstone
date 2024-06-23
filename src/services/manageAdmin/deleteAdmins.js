import { axiosInstance } from "@/lib/axios";

export const deleteAdmins = async (token,id) => {
  try {
    const res = await axiosInstance.delete(`admin/admins/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete admins");
  }
};
