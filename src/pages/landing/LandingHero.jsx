import Hero from '@/assets/img/Hero section.png';
import Navbar from '@/components/navbar';

export default function LandingHero() {
    return (
        <div className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center rounded-bl-3xl rounded-br-3xl" style={{ backgroundImage: `url(${Hero})` }}>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h1 className="text-neutral-50 text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 lg:mb-8 font-sans">
                    Start Your Journey!
                </h1>
                <p className="text-neutral-50 text-base md:text-lg lg:text-2xl font-normal max-w-md md:max-w-lg lg:max-w-2xl font-sans">
                    Temukan destinasi impian, dapatkan rekomendasi tempat wisata, dan rencanakan perjalanan Anda dengan mudah.
                </p>
            </div>
        </div>
    );
}