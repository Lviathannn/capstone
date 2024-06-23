import Thumbnail from "@/components/features/uploader/Thumbnail";
import Uploader from "@/components/features/uploader/Uploader";
import { Input } from "@/components/ui/input";

export default function ImageUploader({
  file1,
  file2,
  file3,
  setFile1,
  setFile2,
  setFile3,
}) {
  return (
    <div className="grid grid-cols-1 justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
      {file1?.file ? (
        <div className="w-full">
          <Thumbnail
            fileState={file1}
            setFile={setFile1}
            onDelete={() => {
              setFile1({
                description: "",
                file: null,
              });
            }}
          />
          <Input
            className="mt-2 h-8 rounded-md"
            required
            placeholder="Gambar 1 : Sampul"
            onChange={(e) => {
              setFile1({
                ...file1,
                description: e.target.value,
              });
            }}
          />
        </div>
      ) : (
        <div className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center">
          <Uploader setFile={setFile1} fileState={file1} />
          <p className="mt-2 text-xs text-neutral-400">Upload Foto 1</p>
        </div>
      )}

      {file2?.file ? (
        <div className="w-full">
          <Thumbnail
            fileState={file2}
            setFile={setFile2}
            onDelete={() => {
              setFile2({
                description: "",
                file: null,
              });
            }}
          />

          <Input
            className="mt-2 h-8 rounded-md"
            required
            placeholder="Gambar 2"
            onChange={(e) => {
              setFile2({
                ...file2,
                description: e.target.value,
              });
            }}
          />
        </div>
      ) : (
        <div className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center">
          <Uploader setFile={setFile2} fileState={file2} />
          <p className="mt-2 text-xs text-neutral-400">Upload Foto 2</p>
        </div>
      )}

      {file3?.file ? (
        <div className="w-full">
          <Thumbnail
            fileState={file3}
            setFile={setFile3}
            onDelete={() => {
              setFile3({
                description: "",
                file: null,
              });
            }}
          />
          <Input
            className="mt-2 h-8 rounded-md"
            required
            placeholder="Gambar 3"
            onChange={(e) => {
              setFile3({
                ...file3,
                description: e.target.value,
              });
            }}
          />
        </div>
      ) : (
        <div className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center">
          <Uploader setFile={setFile3} fileState={file3} />
          <p className="mt-2 text-xs text-neutral-400">Upload Foto 3</p>
        </div>
      )}
    </div>
  );
}
