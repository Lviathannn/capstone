import { axiosInstance } from "@/lib/axios";

export const postImage = async (token, body) => {
  return await axiosInstance.post(`/admin/destination-media/image`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
