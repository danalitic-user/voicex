
import Features1 from "./DetailedFeatures";
import Features2 from "./ComprehensiveFeatures";
import RevealOnScroll from "@/components/RevealOnScroll";
import Navbar from "@/components/landing/Navbar";

import { Footer } from "@/components/landing/Footer";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="pt-24">
          <RevealOnScroll>
            <Features1 />
          </RevealOnScroll>

          <div className="border-t border-gray-100">
            <RevealOnScroll>
              <Features2 />
            </RevealOnScroll>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}