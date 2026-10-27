import Navbar from "@/components/Navbar";
import ParticleHero from "@/components/ParticleHero";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import HowItTradesSection from "@/components/HowItTradesSection";
import LivePerformanceSection from "@/components/LivePerformanceSection";
import PricingSection from "@/components/PricingSection";
import HowToGetFreeSection from "@/components/HowToGetFreeSection";
import DownloadsSection from "@/components/DownloadsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Navbar />
      <ParticleHero />
      <StatsBar />
      <FeaturesSection />
      <HowItTradesSection />
      <LivePerformanceSection />
      <PricingSection />
      <HowToGetFreeSection />
      <DownloadsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
