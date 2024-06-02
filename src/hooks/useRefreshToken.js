import { axiosInstance } from "@/lib/axios";

export default function useRefreshToken() {
  const refresh = async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return refresh;
}
