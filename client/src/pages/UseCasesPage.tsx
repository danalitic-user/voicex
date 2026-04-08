import Navbar from "@/components/landing/Navbar";
import UseCases1 from "./UseCases1";
import UseCases2 from "./UseCases2";
import RevealOnScroll from "@/components/RevealOnScroll"; // Keep this from the global folder
import { Footer } from "@/components/landing/Footer";

export default function FeaturesPage() {
  return (
    <>    <Navbar />
      <main
        className="min-h-screen bg-white pt-24">

        <RevealOnScroll>
          <UseCases1 />
        </RevealOnScroll>

        <div className="border-t border-gray-100">
          <RevealOnScroll>
            <UseCases2 />
          </RevealOnScroll>
        </div>
      </main>
      <Footer />
    </>

  );
}