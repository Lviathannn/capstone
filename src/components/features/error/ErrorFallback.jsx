import { Button } from "@/components/ui/button";
import ErrorImg from "@/assets/img/error-boundary.png";

export function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex h-screen w-full flex-col  items-center justify-center gap-5"
    >
      <img src={ErrorImg} alt="error" className="size-44" />
      <h1 className="text-xl font-medium">Upss Ada yang salah !</h1>
      <div className="space-x-2">
        <Button onClick={resetErrorBoundary}>Coba Lagi</Button>
      </div>
    </div>
  );
}
