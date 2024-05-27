import Hero from "@/assets/img/Hero section.png";
import Navbar from "@/components/layouts/navbar";

export default function LandingHero() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center rounded-bl-3xl rounded-br-3xl bg-cover bg-center text-center"
      style={{ backgroundImage: `url(${Hero})` }}
    >
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="mb-[19px] text-[40px] font-extrabold text-neutral-50">
          Start Your Journey!
        </h1>
        <p className="max-w-2xl text-2xl font-normal text-neutral-50">
          Temukan destinasi impian, dapatkan rekomendasi tempat wisata, dan
          rencanakan perjalanan Anda dengan mudah.
        </p>
      </div>
    </div>
  );
}
