import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FreeAccessContent from "@/components/FreeAccessContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Get GTM PRO Free — Partner Broker Registration | GoldTacticalMachine.com",
  description:
    "Open a verified account with Vantage Markets or Exness under our IB link and get full access to GTM PRO at zero cost. Step-by-step instructions and claim verification form.",
};

export default function FreeAccessPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Navbar />
      <FreeAccessContent />
      <Footer />
    </main>
  );
}

