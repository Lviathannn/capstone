import axios from "axios";
import { toast } from "sonner";
import { store } from "./store";
import { resetUser, setLoading, updateToken } from "./slice/authSlice";

export const axiosInstance = axios.create({
  baseURL: "/api",
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
    store.dispatch(setLoading(true));
    if (error?.response?.data?.message == "Token sudah kadaluwarsa") {
      try {
        const res = await axiosInstance.get("/admin/auth/token", {
          withCredentials: true,
        });
        if (res?.data?.status == "Success") {
          store.dispatch(updateToken(res?.data?.data?.access_token));
        } else {
          toast.error("Unauthorized", {
            description: "Login untuk melanjutkan",
          });
          store.dispatch(resetUser());
        }
      } catch (error) {
        toast.error("Unauthorized", {
          description: "Login untuk melanjutkan",
        });
        store.dispatch(resetUser());
      }

      store.dispatch(setLoading(false));
      return;
    }

    if (error?.response?.status === 401) {
      store.dispatch(resetUser());

      toast.error("Unauthorized", {
        description: "Login untuk melanjutkan",
      });

      store.dispatch(setLoading(false));
      store.dispatch(resetUser(false));
      return;
    }

    store.dispatch(setLoading(false));
    toast.error("Terjadi kesalahan !", {
      description: getShownMessage(error),
    });
    return Promise.reject(error);
  },
);
