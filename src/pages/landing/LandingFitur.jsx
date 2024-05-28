import React from 'react';
import Search from '@/assets/img/Searching.png';
import Share from '@/assets/img/Share location.png';
import Chatbot from '@/assets/img/Chatbot.png';

const features = [
  {
    imgSrc: Search,
    altText: "Search",
    title: "Temukan Destinasi Impianmu!",
    description: "Jelajahi destinasi impianmu dengan mudah dan cepat. Temukan tempat eksotis, indah, dan menarik yang sesuai preferensimu. Mulailah petualanganmu sekarang!"
  },
  {
    imgSrc: Share,
    altText: "Share location",
    title: "Rencanakan Rute Terbaik!",
    description: "Jadwalkan aktivitasmu, kunjungi tempat menarik, dan nikmati pengalaman wisata yang tak terlupakan. Rencanakan kunjunganmu agar petualanganmu terorganisir dengan baik!"
  },
  {
    imgSrc: Chatbot,
    altText: "Chatbot",
    title: "AI Assistant Siap Membantu!",
    description: "Dapatkan bantuan cepat dari AI Assistant kami. Nikmati pengalaman wisatamu yang lancar dengan saran dan rekomendasi tentang destinasi, aktivitas, dan layanan wisata."
  }
];

export default function LandingFitur() {
  return (
    <div className="py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-neutral-900 text-4xl font-bold mb-[60px]">
          Kenapa <span className="text-primary-500">Tourease</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105"
            >
              <img src={feature.imgSrc} alt={feature.altText} className="mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 font-sans">{feature.title}</h3>
              <p className="text-neutral-900 text-sm font-sans px-5">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
