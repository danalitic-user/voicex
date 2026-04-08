"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBranding } from "@/components/BrandingProvider";
import { AuthStorage } from "@/lib/auth-storage";
// import { LandingLanguageSelector } from "@/components/LandingLanguageSelector"; // Commented out import

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { branding } = useBranding();
  const { t } = useTranslation();

  const isAuthenticated = AuthStorage.isAuthenticated();
  const isAdmin = AuthStorage.isAdmin();

  const navLinks = [
    { href: "/features", label: t('landing.navbar.features', 'Features') },
    { href: "/use-cases", label: t('landing.navbar.useCases', 'Use Cases') },
    { href: "/pricing", label: t('landing.navbar.pricing', 'Pricing') },
    { href: "/integrations", label: t('landing.navbar.integrations', 'Integrations') },
    { href: "/blog", label: t('landing.navbar.blog', 'Blog') },
    { href: "/contact", label: t('landing.navbar.contact', 'Contact') },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthRedirect = () => {
    if (isAuthenticated) {
      window.location.href = isAdmin ? "/admin" : "/app";
    } else {
      // CHANGED: This now routes to /register instead of /login
      setLocation("/register");
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-transparent backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 relative">

        {/* LOGO - Left */}
        <div className="flex justify-start z-10">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {branding.logo_url ? (
              <img src={branding.logo_url} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter flex items-center">
                <span className="text-black">Voice</span>
                <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent pr-1">
                  X
                </span>
              </h1>
            )}
          </Link>
        </div>

        {/* NAV LINKS - Absolute Centered & Forced One Line */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 text-gray-700 font-medium whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group transition-colors py-1 ${isActive ? "text-black font-bold" : "text-gray-500 hover:text-black font-semibold"
                  }`}
              >
                {link.label}
                <span className={`absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] transition-all duration-300 ease-out rounded-full
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}>
                </span>
              </Link>
            );
          })}
        </div>

        {/* ACTIONS & LANG - Right Group */}
        <div className="flex items-center gap-4 md:gap-6 z-10">
          {/* DESKTOP LANGUAGE SELECTOR - COMMENTED OUT 
          <div className="hidden md:flex items-center">
            <LandingLanguageSelector needsLightText={false} />
          </div> 
          */}

          <button
            onClick={() => setLocation("/login")}
            className="hidden sm:block text-sm font-bold text-gray-700 hover:text-black transition-colors"
          >
            {t('landing.navbar.login', 'Login')}
          </button>

          <button
            onClick={handleAuthRedirect}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] hover:bg-right shadow-none hover:shadow-lg hover:shadow-[#FF0073]/30 transition-all duration-500 active:scale-95 border-0"
          >
            {isAuthenticated
              ? (isAdmin ? 'Admin' : 'Dashboard')
              : t('landing.navbar.signup', 'Sign Up')
            }
          </button>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-[100] bg-white p-6 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-black">Voice<span className="text-[#FF6633]">X</span></h1>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-8 w-8 text-black" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              {/* MOBILE LANGUAGE SELECTOR - COMMENTED OUT
              <div className="flex items-center justify-between py-2">
                <span className="font-bold text-gray-500">Language</span>
                <LandingLanguageSelector needsLightText={false} />
              </div> 
              */}

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-xl font-bold border-2"
                  onClick={() => { setLocation("/login"); setIsMobileMenuOpen(false); }}
                >
                  {t('landing.navbar.login', 'Login')}
                </Button>
                <Button
                  className="w-full h-14 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] border-0"
                  onClick={() => { handleAuthRedirect(); setIsMobileMenuOpen(false); }}
                >
                  {isAuthenticated ? 'Dashboard' : 'Sign Up Free'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;