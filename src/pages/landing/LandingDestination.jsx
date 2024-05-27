import Destination from "../../assets/img/destination.png";

export default function LandingDestination() {
  return (
    <div className="container mx-auto my-[30px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="py-[105px]">
          <img
            src={Destination}
            alt="Destination"
            className="h-[490px] w-[578px] rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center py-[70px]">
          <h2 className="text-primary-500 mb-4 text-2xl font-medium ">
            Poin - Poin Berwisata
          </h2>
          <h3 className="mb-4 text-4xl font-bold  text-neutral-900">
            Kami membantu menemukan tempat impianmu
          </h3>
          <p className="text-base font-normal text-neutral-900 ">
            Dapatkan destinasi yang memadukan keindahan dan kenyamanan. Kami
            hadir untuk membantu kamu merencanakan perjalanan yang tak hanya
            memuaskan hasrat berpetualang tetapi juga memberikan pengalaman yang
            tak terlupakan. Nikmati pengalaman wisata yang bertanggung jawab
            dengan berbagai pilihan di Indonesia. Jadikan perjalananmu bermakna
            dengan kami.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                count: "100+",
                text: "Destinasi wisata eksklusif di Indonesia yang siap untuk dijelajahi",
              },
              {
                count: "38",
                text: "Provinsi di Indonesia dengan keunikan dan pesona masing-masing.",
              },
              {
                count: "68",
                text: "Panduan rute perjalanan di Indonesia yang membantu Anda menjelajahi negeri.",
              },
              {
                count: "32M+",
                text: "Pengunjung yang telah menikmati pengalaman wisata di Indonesia bersama kami.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 text-start shadow-lg "
              >
                <p className="text-primary-500 text-2xl font-bold">
                  {item.count}
                </p>
                <p className="mt-2 text-sm font-normal text-neutral-900">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
