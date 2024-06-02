import Lock from "@/components/icons/Lock";
import User from "@/components/icons/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <form className="grid gap-14">
      <div className="grid gap-2">
        <Label htmlFor="username" className="font-bold text-primary">
          Nama Pengguna
        </Label>
        <div className="relative w-full rounded-[12px] bg-white">
          <User className="absolute left-3 top-2 text-primary" />
          <Input
            id="username"
            type="text"
            required
            className="absolute bg-transparent pl-12"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password" className="font-bold text-primary">
            Password
          </Label>
        </div>
        <div className="relative w-full rounded-[12px] bg-white">
          <Lock className="absolute left-3 top-2 text-primary" />
          <Input
            className="absolute bg-transparent pl-12"
            id="password"
            type="password"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full rounded-[12px]">
        Masuk
      </Button>
    </form>
  );
}
