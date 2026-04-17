'use client';
import RevealOnScroll from "@/components/RevealOnScroll"; // Reveal on Scroll Animation
import Pricing1 from "./Pricing1";
import Navbar from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        <RevealOnScroll>
          <Pricing1 />
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  );
}