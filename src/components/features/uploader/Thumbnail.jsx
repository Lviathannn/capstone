import Pen from "@/components/icons/Pen";
import TrashCan from "@/components/icons/TrachCan";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Files from "react-files";

export default function Thumbnail({ onDelete, setFile, fileState }) {
  const url = URL.createObjectURL(fileState?.file[0]);

  return (
    <div
      className="group flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-cover bg-center"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <div className="flex h-full w-full items-end justify-end bg-black/30 p-1 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
        <div className="flex gap-1">
          <Files
            onChange={(file) => {
              if (file.length === 0) {
                return;
              }
              setFile({
                ...fileState,
                file,
              });
            }}
            onError={(error) => {
              const errorMessage = () => {
                if (error?.code === 1) {
                  return "Format gambar tidak didukung!";
                }

                if (error?.code === 2) {
                  return "Gambar tidak boleh lebih dari 2 mb!";
                }

                if (error?.code === 3) {
                  return "Ukuran gambar terlalu kecil!";
                }

                return "Gagal mengunggah gambar!";
              };

              toast.error(errorMessage());
            }}
            accepts={["image/*"]}
            multiple={false}
            maxFileSize={1000000}
            minFileSize={0}
            clickable
          >
            <Button
              size="icon"
              type="button"
              variant="ghost"
              className="h-8 w-8 hover:bg-neutral-50/20"
            >
              <Pen fill="#fff" />
            </Button>
          </Files>

          <Button
            type="button"
            onClick={onDelete}
            size="icon"
            variant="ghost"
            className="h-8 w-8 hover:bg-neutral-50/20"
          >
            <TrashCan fill="#fff" />
          </Button>
        </div>
      </div>
    </div>
  );
}
