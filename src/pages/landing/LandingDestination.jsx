import Horizontal_1 from '@/assets/img/1.png';
import Horizontal_2 from '@/assets/img/2.png';
import Veritikal_A from '@/assets/img/A.png';
import Veritikal_B from '@/assets/img/B.png';

export default function LandingDestination() {
    return (
        <div className="container mx-auto py-[30px] px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="py-[30px] md:py-[105px] md:px-6">
                    <div className="flex flex-wrap justify-center md:justify-between items-center">
                        <img src={Horizontal_1} alt="Horizontal 1" className="flex-shrink-0 w-full sm:w-1/2 sm:h-1/2 md:w-[181.19px] h-[228.97px]  mb-4 md:mb-0 shadow-xl"/>
                        <div className="flex flex-col items-center w-full md:w-auto mb-4 md:mb-0">
                            <img src={Veritikal_A} alt="Vertikal A" className="w-full md:w-[181.19px] h-[238.13px] sm:w-1/2 sm:h-1/2 mb-4 md:mb-5 shadow-xl"/>
                            <img src={Veritikal_B} alt="Vertikal B" className="w-full md:w-[181.19px] h-[238.13px] sm:w-1/2 sm:h-1/2 shadow-xl"/>
                        </div>
                        <img src={Horizontal_2} alt="Horizontal 2" className="flex-shrink-0 w-full sm:w-1/2 sm:h-1/2 md:w-[181.19px] h-[228.97px]  mt-4 md:mt-0 shadow-xl"/>
                    </div>
                </div>
                <div className="flex flex-col justify-center py-[30px] md:py-[70px]">
                    <h2 className="text-primary-500 text-2xl font-medium mb-4 font-sans">
                        Poin - Poin Berwisata
                    </h2>
                    <h3 className="text-neutral-900 text-3xl md:text-4xl font-bold font-sans mb-4">
                        Kami membantu menemukan tempat impianmu
                    </h3>
                    <p className="text-neutral-900 text-base font-normal font-sans mb-4">
                        Dapatkan destinasi yang memadukan keindahan dan kenyamanan. Kami hadir untuk membantu kamu merencanakan perjalanan yang tak hanya memuaskan hasrat berpetualang tetapi juga memberikan pengalaman yang tak terlupakan. Nikmati pengalaman wisata yang bertanggung jawab dengan berbagai pilihan di Indonesia. Jadikan perjalananmu bermakna dengan kami.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {[
                            { count: '100+', text: 'Destinasi wisata eksklusif di Indonesia yang siap untuk dijelajahi' },
                            { count: '38', text: 'Provinsi di Indonesia dengan keunikan dan pesona masing-masing.' },
                            { count: '68', text: 'Panduan rute perjalanan di Indonesia yang membantu Anda menjelajahi negeri.' },
                            { count: '32M+', text: 'Pengunjung yang telah menikmati pengalaman wisata di Indonesia bersama kami.' },
                        ].map((item, index) => (
                            <div key={index} className="bg-neutral-50 p-4 rounded-lg shadow-lg text-start font-sans">
                                <p className="text-primary-500 text-2xl font-bold">{item.count}</p>
                                <p className="text-neutral-900 text-sm font-normal mt-2">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
