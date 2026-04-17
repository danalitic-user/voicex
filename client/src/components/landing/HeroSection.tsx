/**
 * ============================================================
 * © 2026 VoiceX - A Danaltic Product. All rights reserved.
 * Original Author: Danalitic Engineering Team
 * Website: https://danalitic.in
 *
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 * 
 * HeroSection
 * Features: White background, animated soundwave overlay,
 * Pink-to-Orange gradients, and centered typography.
 * ============================================================
 */
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { AuthStorage } from "@/lib/auth-storage";
import { useTranslation } from 'react-i18next';

const NUM_BARS = 60;

export function HeroSection() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const isAuthenticated = AuthStorage.isAuthenticated();
  const isAdmin = AuthStorage.isAdmin();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [mounted, setMounted] = useState(false);

  const rotatingWords = [
    t('landing.hero.rotatingWords.sales'),
    t('landing.hero.rotatingWords.support'),
    t('landing.hero.rotatingWords.outreach'),
    t('landing.hero.rotatingWords.appointments'),
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const getDashboardLink = () => {
    if (isAuthenticated) return isAdmin ? "/admin" : "/app";
    return "/login";
  };

  const handleScroll = () => {
    const nextSection = document.getElementById("features");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen mt-[-70px] flex flex-col justify-center items-center overflow-hidden bg-white"
      data-testid="hero-section"
    >
      <style>{`
        @keyframes soundwave {
          0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .animate-soundwave {
          animation: soundwave 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Soundwave Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center gap-1 md:gap-2 px-4 opacity-10">
        {mounted && Array.from({ length: NUM_BARS }).map((_, i) => {
          const baseHeight = 20 + Math.abs(Math.sin(i * 0.2) * 60);
          const delay = Math.sin(i * 0.5) * 0.5;
          const duration = 1.2 + Math.abs(Math.cos(i) * 0.5);
          return (
            <div
              key={i}
              className="w-1 md:w-3 bg-gradient-to-t from-[#FF0066] via-[#FF6633] to-[#FFBB33] rounded-full animate-soundwave"
              style={{
                height: `${baseHeight}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8 flex flex-col items-center"
        >
          {/* Main Logo Branding */}
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter flex items-center justify-center">
            <span className="text-black">Voice</span>
            <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent pr-1">
              X
            </span>
          </h1>

          {/* Headline with Rotating Words */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight max-w-4xl leading-tight flex flex-col items-center min-h-[7rem] md:min-h-[8rem]">
            <span>{t("Human-like AI Voice Agents for")}</span>
            <span
              className={`block mt-2 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] transition-opacity duration-300 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
            >
              {rotatingWords[currentIndex]}
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
            {t('landing.hero.subheadline') || "Empower your business with AI-driven intelligence. Reach thousands of customers simultaneously with voices that sound, feel, and convert like real people."}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
            <Link href={getDashboardLink()}>
              <Button
                className="h-14 px-10 rounded-full font-bold text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] bg-[0%_0%] hover:bg-[100%_0%] shadow-lg hover:shadow-[#FF0073]/40 transition-all duration-500 active:scale-95 border-0"
              >
                {t('landing.hero.getStarted')}
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('trigger-demo-call'));
                handleScroll();
              }}
              className="h-14 px-10 bg-white/80 border-2 border-slate-200 text-slate-900 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-sm"
            >

              {t('Learn More')}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Spacer for bottom layout */}
      <div className="invisible h-[80px] hidden md:block"></div>
    </section>
  );
}

export default HeroSection;