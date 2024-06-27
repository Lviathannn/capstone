import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getContentById } from "@/services/manageContent/getContentById";
import Preview from "@/assets/img/preview-video.png";
import ReactPlayer from "react-player";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

const useGetContentId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token);

  const { data, error, isLoading } = useQuery({
    queryKey: ["content", id],
    queryFn: () => getContentById(token, id),
    enabled: !!token && !!id,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  return { data, error, isLoading };
};

export default function DetailContent() {
  const loc = useLocation();
  const textareaRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetContentId(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const content = data.data;

  return (
    <ProtectedLayout>
      <main className="flex h-full flex-col bg-primary-50 px-10 py-6">
        <div className="mb-6 rounded-lg bg-neutral-50 p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-jakarta-sans text-[26px] font-bold text-neutral-800">
                Detail Konten
              </h1>
              <p className="font-jakarta-sans text-base font-medium text-neutral-700">
                Lihat detail data konten video
              </p>
            </div>
            <Button
              className="bg-primary-500 font-jakarta-sans text-[14px] font-medium text-white"
              onClick={() => navigate(privateRoutes.CONTENT)}
            >
              Kembali
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-10 rounded-lg bg-neutral-50 px-6 py-8 shadow-md">
          <div className="col-span-2 flex items-start justify-center">
            {content?.url ? (
              content.url.endsWith(".jpg") ||
              content.url.endsWith(".jpeg") ||
              content.url.endsWith(".png") ? (
                <img
                  src={content.url}
                  alt="Preview"
                  className="h-auto w-auto object-cover"
                />
              ) : (
                <ReactPlayer
                  url={content.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  className="react-player"
                />
              )
            ) : (
              <img
                src={Preview}
                alt="Alert Add"
                className="h-auto w-auto object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            )}
          </div>
          <div className="col-span-10 gap-4">
            <div className="relative col-span-12 mb-3">
              <Label
                htmlFor="name"
                className="pb-2 font-jakarta-sans text-sm font-bold"
              >
                Nama Destinasi
              </Label>
              <Input
                id="destinationName"
                readOnly
                value={content?.destination.name || ""}
              />
            </div>
            <div className="relative col-span-12 mb-3">
              <Label
                htmlFor="description"
                className="pb-2 font-jakarta-sans text-sm font-bold"
              >
                Deskripsi Konten
              </Label>
              <textarea
                id="description"
                value={content?.title || ""}
                ref={textareaRef}
                className="flex h-auto w-full resize-none overflow-hidden rounded-[10px] border border-input bg-background p-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                readOnly
              />
            </div>
            <div className="relative col-span-12 mb-3">
              <Label
                htmlFor="url"
                className="pb-2 font-jakarta-sans text-sm font-bold"
              >
                Link Terkait
              </Label>
              <Input id="url" value={content?.url || ""} readOnly />
            </div>
          </div>
        </div>
      </main>
    </ProtectedLayout>
  );
}
