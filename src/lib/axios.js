import axios from "axios";
import { toast } from "sonner";
import { store } from "./store";
import { resetUser, updateToken } from "./slice/authSlice";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getShownMessage = (error) => {
  if (error.response?.status && error.response.status >= 500) {
    return "Ada masalah dengan server, coba lagi nanti";
  } else if (
    error.response?.status &&
    error.response.status < 500 &&
    error.response.status >= 400
  ) {
    return `${error.response.data.message}`;
  } else {
    return "Coba lagi nanti";
  }
};

axiosInstance.interceptors.response.use(
  (res) => res,

  async (error) => {
    if (
      error?.response?.status === 500 &&
      error?.response?.data?.message == "Token sudah kadaluwarsa"
    ) {
      try {
        const res = await axiosInstance.get("/admin/auth/token", {
          withCredentials: true,
        });

        console.log(res.data);

        if (res?.data?.status == "Success") {
          store.dispatch(updateToken(res?.data?.data?.access_token));
        } else {
          toast.error("Unauthorized", {
            description: "Login untuk melanjutkan",
          });
          store.dispatch(resetUser());
        }
      } catch {
        toast.error("Unauthorized", {
          description: "Login untuk melanjutkan",
        });
      }

      return;
    }

    if (error?.response?.status === 401) {
      toast.error("Unauthorized", {
        description: "Login untuk melanjutkan",
      });

      store.dispatch(resetUser());
      return;
    }

    toast.error("Terjadi kesalahan !", {
      description: getShownMessage(error),
    });
    console.log(error);
    return Promise.reject(error);
  },
);
