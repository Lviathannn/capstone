import { FEATURES_DATA } from "@/constant";

export default function LandingFitur() {
  return (
    <div className="py-[66px]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-[60px] text-4xl font-bold text-neutral-900">
          Kenapa <span className="text-primary-500">Tourease</span>?
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES_DATA.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 text-center shadow-lg"
            >
              <img
                src={feature.imgSrc}
                alt={feature.altText}
                className="mx-auto mb-6"
              />
              <h3 className="mb-4  text-xl font-bold">{feature.title}</h3>
              <p className="px-5  text-sm text-neutral-900">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
