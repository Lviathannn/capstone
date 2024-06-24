import Eye from "@/components/icons/Eye";
import Lock from "@/components/icons/Lock";
import User from "@/components/icons/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "@/services/auth/login";
import { toast } from "sonner";
import { setUser } from "@/lib/slice/authSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(1).max(50),
});

export default function LoginForm() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    // dispatch(setUser(values));
    setLoading(true);
    try {
      const res = await login(values);
      dispatch(setUser(res.data));
      navigate("/dashboard");
      toast.success("Login berhasil", {
        description: "Anda akan diarahkan ke halaman dashboard",
      });
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-14" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-primary">
                Nama Pengguna
              </FormLabel>
              <FormControl>
                <div className="relative w-full rounded-[12px]">
                  <User
                    className="absolute left-3 top-2 text-primary"
                    fill={
                      form.formState.errors.username ? "#D05641" : "#6CA491"
                    }
                  />
                  <Input
                    type="text"
                    className={`absolute bg-transparent pl-12 ${form.formState.errors.username && "border-danger-400 focus-visible:ring-0"}`}
                    placeholder="Nama Pengguna"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-primary">Password</FormLabel>
              <FormControl>
                <div className="relative w-full rounded-[12px] bg-white">
                  <Lock
                    className={`absolute left-3 top-2 `}
                    fill={
                      form.formState.errors.password ? "#D05641" : "#6CA491"
                    }
                  />
                  <Input
                    className={`absolute bg-transparent pl-12 ${form.formState.errors.password && "border-danger-400 focus-visible:ring-0"}`}
                    type={visible ? "text" : "password"}
                    placeholder="Kata Sandi"
                    {...field}
                  />
                  <button
                    className="absolute right-3 top-2"
                    type="button"
                    onClick={() => setVisible(!visible)}
                  >
                    <Eye />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-[12px]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Masuk"}
        </Button>
      </form>
    </Form>
  );
}
