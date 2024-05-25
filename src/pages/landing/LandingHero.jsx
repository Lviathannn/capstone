import Hero from '../../assets/img/Hero section.png';
import Navbar from '../../components/navbar';

export default function LandingHero() {
    return (
        <div className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center rounded-bl-3xl rounded-br-3xl" style={{ backgroundImage: `url(${Hero})` }}>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-neutral-50 text-[40px] font-extrabold mb-[19px] font-sans">
                Start Your Journey!
            </h1>
            <p className="text-neutral-50 text-2xl font-normal max-w-2xl font-sans">
                Temukan destinasi impian, dapatkan rekomendasi tempat wisata, dan rencanakan perjalanan Anda dengan mudah.
            </p>
            </div>
        </div>
    );
}