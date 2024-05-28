import { Link } from 'react-scroll';
import Logo from '@/assets/img/logo.png';

export default function Footer() {
    return (
        <footer className="bg-primary-400 text-neutral-50 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="pr-0 md:pr-10 lg:pr-36">
                        <img src={Logo} alt="Logo" className="h-10 mb-4" />
                        <p className="mb-4 text-sm md:text-base font-normal font-sans text-justify">
                            Tourease adalah aplikasi yang membantu kamu merencanakan dan menikmati perjalananmu. Dengan fitur-fitur seperti rekomendasi personal, rekomendasi rute, profil, home, rute tersimpan, asisten AI, destinasi, dan konten video, Tourease bertujuan untuk menjadi teman perjalananmu yang ideal.
                        </p>
                    </div>

                    <div className="pl-0 md:pl-10 lg:pl-36">
                        <p className="font-bold text-lg md:text-xl mb-4">Pelayanan</p>
                        <ul>
                            <li className="mb-4 text-sm font-normal font-sans">
                                <Link to="landing-tentangkami" smooth={true} duration={500} className="text-neutral-50 cursor-pointer">Tentang Kami</Link>
                            </li>
                            <li className="mb-4 text-sm font-normal font-sans">
                                <Link to="landing-destination" smooth={true} duration={500} className="text-neutral-50 cursor-pointer">Destinasi</Link>
                            </li>
                            <li className="mb-4 text-sm font-normal font-sans">
                                <Link to="landing-fitur" smooth={true} duration={500} className="text-neutral-50 cursor-pointer">Fitur Unggulan</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="pl-0 md:pl-10 lg:pl-36 text-neutral-50">
                        <p className="font-bold text-lg md:text-xl mb-4">Kontak</p>
                        <ul>
                            <li className="mb-4 text-sm font-normal font-sans">Jalan: Jl.TourEase No.205A</li>
                            <li className="mb-4 text-sm font-normal font-sans">No Telepon: 123 456 7890</li>
                            <li className="mb-4 text-sm font-normal font-sans">Email: TourEase@gmail.com</li>
                            <li className="mb-4 text-sm font-normal font-sans">Maps: Malang, Jawa Tengah</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}