"use client";

import React from 'react';
import { useLocation } from 'wouter';
import {
  Clock,
  HeartHandshake,
  CircleDollarSign,
  Rocket,
  LineChart,
  ShieldCheck
} from 'lucide-react';
import { AuthStorage } from "@/lib/auth-storage";

const advantages = [
  {
    title: "24/7 Automated Operations",
    description: "Never miss a customer call with always-on AI agents handling calls round-the-clock.",
    icon: Clock,
  },
  {
    title: "Great Customer Experience",
    description: "Realistic voice interactions that feel natural and human, improving satisfaction scores.",
    icon: HeartHandshake,
  },
  {
    title: "Time & Cost Savings",
    description: "Reduce operational costs by up to 80% compared to manual calling and support teams.",
    icon: CircleDollarSign,
  },
  {
    title: "Scalability Without Hiring",
    description: "Scale your operations instantly without hiring, training, or managing additional staff.",
    icon: Rocket,
  },
  {
    title: "Data-Driven Insights",
    description: "Every call is transcribed, analyzed, and turned into actionable business intelligence.",
    icon: LineChart,
  },
  {
    title: "Compliance & Security",
    description: "Enterprise-grade security with HIPAA, GDPR, and SOC2 compliance built-in.",
    icon: ShieldCheck,
  }
];

export default function WhyVoiceX() {
  const [, setLocation] = useLocation();

  const isAuthenticated = AuthStorage.isAuthenticated();
  const isAdmin = AuthStorage.isAdmin();

  // Standardized redirect logic
  const handleGetStarted = () => {
    if (isAuthenticated) {
      setLocation(isAdmin ? "/admin" : "/app");
    } else {
      setLocation("/login");
    }
  };

  return (
    <section className="py-24 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* LEFT COLUMN: Sticky Header */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 pt-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-6 leading-tight">
              Why Choose <br className="hidden lg:block" />
              <span className="text-black">Voice</span>
              <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent pr-1">
                X
              </span>
              <span className="text-black">?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-md">
              Ditch the manual call centers. Empower your business with an AI workforce that scales instantly, costs less, and never sleeps.
            </p>
          </div>

          {/* RIGHT COLUMN: Vertical Scrolling List */}
          <div className="w-full lg:w-7/12 flex flex-col space-y-12 md:space-y-16">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-8 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF0066]/10 to-[#FFBB33]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-black group-hover:text-[#FF0066] transition-colors duration-300 relative z-10" />
                  </div>

                  <div className="pt-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF0066] group-hover:to-[#FF6633] transition-all duration-300 w-fit">
                      {adv.title}
                    </h3>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 mt-40">
        <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center text-center gap-6">

          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-black text-black mb-3 tracking-tight">
              Ready to get started?
            </h3>
            <p className="text-gray-600 font-medium text-base md:text-lg">
              Join hundreds of businesses scaling with VoiceX AI.
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-3 w-full">
            <button
              onClick={handleGetStarted}
              className="w-40 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] hover:bg-right transition-all duration-500 active:scale-95 shadow-md shadow-[#FF0073]/10"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            </button>
            <button
              onClick={() => setLocation("/contact")}
              className="w-40 py-4 bg-white border border-gray-200 text-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}