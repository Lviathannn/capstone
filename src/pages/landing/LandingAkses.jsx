import Akses from "@/assets/img/Akses.png";
import AppStore from "@/assets/img/AppStore.png";
import GooglePlay from "@/assets/img/GooglePlay.png";
import { Link } from "react-router-dom";

export default function LandingAkses() {
  return (
    <section className="container mx-auto px-4 py-10 md:px-0">
      <div className="grid grid-cols-1 gap-12 py-10 md:grid-cols-2 md:gap-28 md:py-20">
        <div className="flex flex-col items-center justify-center px-4 md:items-start md:px-8">
          <h2 className="mb-8 font-jakarta-sans text-2xl font-bold text-primary-500 md:mb-12 md:text-4xl">
            Dapatkan Akses Langsung Di Aplikasi Kami
          </h2>
          <p className="mb-8 max-w-md font-jakarta-sans text-base font-normal text-neutral-900 md:mb-12 md:text-lg">
            Dengan aplikasi kami, kamu bisa menjelajahi destinasi menakjubkan di
            Indonesia dengan mudah. Temukan tempat eksotis, rencanakan rute, dan
            dapatkan rekomendasi dari AI Assistant. Semua ini bisa diakses
            langsung dari smartphone-mu. Unduh aplikasi kami sekarang dan mulai
            petualangan serumu!
          </p>
          <div className="flex justify-center space-x-4 md:justify-start">
            <Link to="#googleplay">
              <img src={GooglePlay} alt="Google Play" className="h-12" />
            </Link>
            <Link to="#appstore">
              <img src={AppStore} alt="App Store" className="h-12" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={Akses} alt="Akses" className="h-auto max-w-full" />
        </div>
      </div>
    </section>
  );
}
