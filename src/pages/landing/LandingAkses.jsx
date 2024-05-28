import Akses from '@/assets/img/Akses.png';
import AppStore from '@/assets/img/AppStore.png';
import GooglePlay from '@/assets/img/GooglePlay.png';

export default function LandingAkses() {
    return (
        <section className="container mx-auto py-10 px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 py-10 md:py-20">
                <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-primary-500 mb-8 md:mb-12">Dapatkan Akses Langsung Di Aplikasi Kami</h2>
                    <p className="text-base md:text-lg font-normal text-neutral-900 mb-8 md:mb-12 max-w-md">
                        Dengan aplikasi kami, kamu bisa menjelajahi destinasi menakjubkan di Indonesia dengan mudah. Temukan tempat eksotis, rencanakan rute, dan dapatkan rekomendasi dari AI Assistant. Semua ini bisa diakses langsung dari smartphone-mu. Unduh aplikasi kami sekarang dan mulai petualangan serumu!
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#googleplay"><img src={GooglePlay} alt="Google Play" className="h-12" /></a>
                        <a href="#appstore"><img src={AppStore} alt="App Store" className="h-12" /></a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src={Akses} alt="Akses" className="max-w-full h-auto" />
                </div>
            </div>
        </section>
    );
}
