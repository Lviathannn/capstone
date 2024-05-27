import About from "../../assets/img/about.png";

export default function LandingTentangkami() {
  return (
    <div className="container mx-auto py-[30px]">
      <div className="grid grid-cols-1 gap-6 py-[105px] md:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={About}
            alt="About Us"
            className="h-auto w-full max-w-md md:max-w-full"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-20">
          <h2 className="text-primary-500 mb-[30px] text-4xl font-bold ">
            Tentang Kami
          </h2>
          <p className="text-base font-medium text-neutral-900 ">
            TourEase adalah aplikasi mobile inovatif yang menyediakan informasi
            lengkap tentang berbagai destinasi wisata, akses rute perjalanan
            terbaik, dan asisten AI cerdas untuk membantu merencanakan
            perjalanan Anda.
            <br />
            <br />
            Dengan TourEase, Anda bisa menemukan tempat-tempat menarik,
            mendapatkan petunjuk arah yang akurat, dan menerima rekomendasi yang
            dipersonalisasi untuk pengalaman wisata yang lebih menyenangkan dan
            efisien.
            <br />
            <br />
            Jelajahi dunia dengan mudah dan menyenangkan bersama TourEase!
          </p>
        </div>
      </div>
    </div>
  );
}
