import { Link } from "react-scroll";
import Logo from "@/assets/img/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary-400 py-10 text-white">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="pr-0 md:pr-10 lg:pr-36">
            <img src={Logo} alt="Logo" className="mb-4 h-10" />
            <p className="mb-4 text-justify text-[16px] font-normal">
              Tourease adalah aplikasi yang membantu kamu merencanakan dan
              menikmati perjalananmu. Dengan fitur-fitur seperti rekomendasi
              personal, rekomendasi rute, profil, home, rute tersimpan, asisten
              AI, destinasi, dan konten video, Tourease bertujuan untuk menjadi
              teman perjalananmu yang ideal.
            </p>
          </div>

          <div className="pl-0 md:pl-10 lg:pl-36">
            <p className="mb-4 text-xl font-bold">Pelayanan</p>
            <ul>
              <li className="mb-4 text-sm font-normal">
                <Link
                  to="landing-tentangkami"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-neutral-50"
                >
                  Tentang Kami
                </Link>
              </li>
              <li className="mb-4 text-sm font-normal">
                <Link
                  to="landing-destination"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-neutral-50"
                >
                  Destinasi
                </Link>
              </li>
              <li className="mb-4 text-sm font-normal">
                <Link
                  to="landing-fitur"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-neutral-50"
                >
                  Fitur Unggulan
                </Link>
              </li>
            </ul>
          </div>

          <div className="pl-0 text-neutral-50 md:pl-10 lg:pl-36">
            <p className="mb-4 text-xl font-bold">Kontak</p>
            <ul>
              <li className="mb-4 text-sm font-normal">
                Jalan: Jl.TourEase No.205A
              </li>
              <li className="mb-4 text-sm font-normal">
                No Telepon: 123 456 7890
              </li>
              <li className="mb-4 text-sm font-normal">
                Email: TourEase@gmail.com
              </li>
              <li className="mb-4 text-sm font-normal">
                Maps: Malang, Jawa Tengah
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
