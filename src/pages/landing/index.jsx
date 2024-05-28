import LandingHero from "./LandingHero";
import LandingDestination from "./LandingDestination";
import LandingFitur from "./LandingFitur";
import LandingTentangkami from "./LandingTentangkami";
import LandingAkses from "./LandingAkses";
import Footer from "@/components/footer";

export default function LandingPage() {
    return (
        <>
            <div id="landing-hero">
                <LandingHero />
            </div>
            <div id="landing-destination">
                <LandingDestination />
            </div>
            <div id="landing-fitur">
                <LandingFitur />
            </div>
            <div id="landing-tentangkami">
                <LandingTentangkami />
            </div>
            <LandingAkses />
            <Footer />
        </>
    );
}
