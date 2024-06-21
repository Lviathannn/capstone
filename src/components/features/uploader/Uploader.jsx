import Upload from "@/assets/icons/Upload";
import Files from "react-files";
import { toast } from "sonner";

export default function Uploader({ setFile }) {
  return (
    <Files
      className="flex aspect-video w-full items-center justify-center rounded-lg bg-neutral-100 object-cover object-center"
      onChange={(file) => {
        if (file.length === 0) {
          setFile(null);
          return;
        }
        setFile(file);
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
      <Upload />
    </Files>
  );
}
