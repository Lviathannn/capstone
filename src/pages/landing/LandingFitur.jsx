import { FEATURES_DATA } from "@/constant";

export default function LandingFitur() {
  return (
    <div className="py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-[60px] text-4xl font-bold text-neutral-900">
          Kenapa <span className="text-primary-500">Tourease</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES_DATA.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105"
            >
              <img src={feature.imgSrc} alt={feature.altText} className="mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4 font-jakarta-sans">{feature.title}</h3>
              <p className="text-neutral-900 text-sm font-jakarta-sans px-5">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
