import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getContentById } from "@/services/manageContent/getContentById";
import Preview from "@/assets/img/preview-video.png"
import ReactPlayer from "react-player";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

const useGetContentId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token);
  // console.log("Token: ", token); 
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", id],
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
  // console.log("Content ID: ", id); 
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetContentId(id);
  // console.log("Data Content: ", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const content = data.data;

  return (
    <ProtectedLayout>
        <main className="flex flex-col px-10 py-6 bg-primary-50 h-full">
          <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-[26px] font-bold text-neutral-800 font-jakarta-sans">Detail Konten</h1>
                <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Lihat detail data konten video</p>
              </div>
              <Button
                className="bg-primary-500 text-white text-[14px] font-medium font-jakarta-sans"
                onClick={() => navigate(privateRoutes.CONTENT)}
              >
                Kembali
              </Button>
            </div>
          </div>
          <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10">
            <div className="col-span-2 flex justify-center items-start">
              {content?.url ? (
                content.url.endsWith('.jpg') || content.url.endsWith('.jpeg') || content.url.endsWith('.png') ? (
                  <img src={content.url} alt="Preview" className="w-auto h-auto object-cover" />
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
                <img src={Preview} alt="Alert Add" className="w-auto h-auto object-cover" style={{ aspectRatio: '16/9' }} />
              )}
            </div>
            <div className="col-span-10 gap-4">
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="name" className="text-sm font-bold font-jakarta-sans pb-2">Nama Destinasi</Label>
                <Input
                  id="destinationName"
                  readOnly
                  value={content?.destination.name || ""}
                />
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="description" className="text-sm font-bold font-jakarta-sans pb-2">Deskripsi Konten</Label>
                <textarea
                  id="description"
                  value={content?.title || ""}
                  ref={textareaRef}
                  className="w-full h-auto resize-none rounded-[10px] p-2 overflow-hidden flex border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  readOnly
                />
              </div>
              <div className="col-span-12 mb-3 relative">
                <Label htmlFor="url" className="text-sm font-bold font-jakarta-sans pb-2">Link Terkait</Label>
                <Input 
                  id="url"
                  value={content?.url || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
    </ProtectedLayout>
  );
}