'use client';

import React from 'react';
import { useLocation } from "wouter";
import { useTranslation } from 'react-i18next';
import { AuthStorage } from "@/lib/auth-storage";
import {
  SiOpenai, SiTwilio, SiStripe, SiPaypal,
  SiSalesforce, SiHubspot, SiZendesk
} from 'react-icons/si';
import { Mic, PhoneCall, Wallet, Mail, Webhook } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

const integrations = [
  {
    name: "OpenAI",
    description: "Standard model for low-latency, dynamic voice conversations.",
    icon: SiOpenai,
    iconColor: "text-black",
  },
  {
    name: "ElevenLabs",
    description: "Premier engine for natural speech synthesis and emotional tone.",
    icon: Mic,
    iconColor: "text-gray-900",
  },
  {
    name: "Twilio",
    description: "Connect Account SID for global call routing and number management.",
    icon: SiTwilio,
    iconColor: "text-[#F22F46]",
  },
  {
    name: "Plivo",
    description: "Alternative telephony network optimized for multi-region scale.",
    icon: PhoneCall,
    iconColor: "text-[#00B266]",
  },
  {
    name: "Salesforce",
    description: "Log call data, sync contacts, and trigger Salesforce flows via webhooks.",
    icon: SiSalesforce,
    iconColor: "text-[#00A1E0]",
  },
  {
    name: "HubSpot",
    description: "Automatically log all inbound/outbound calls to contact records.",
    icon: SiHubspot,
    iconColor: "text-[#FF7A59]",
  },
  {
    name: "Zendesk",
    description: "Create support tickets instantly from call transcripts.",
    icon: SiZendesk,
    iconColor: "text-[#03363D]",
  },
  {
    name: "Webhooks",
    description: "Push critical call events (`call.started`, `call.completed`) to any URL.",
    icon: Webhook,
    iconColor: "text-[#FF0066]",
  },
  {
    name: "Stripe",
    description: "Handle recurring subscriptions and credit purchases.",
    icon: SiStripe,
    iconColor: "text-[#635BFF]",
  },
  {
    name: "PayPal",
    description: "Accept secure global payments via users' PayPal accounts.",
    icon: SiPaypal,
    iconColor: "text-[#00457C]",
  },
  {
    name: "Razorpay",
    description: "Process payments in India supporting UPI and local cards.",
    icon: Wallet,
    iconColor: "text-[#3395FF]",
  },
  {
    name: "SMTP / Email",
    description: "Send automated call summaries, welcome emails, and low-credit alerts.",
    icon: Mail,
    iconColor: "text-amber-500",
  }
];

export default function IntegrationsPage() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  // Synced Auth Logic
  const isAuthenticated = AuthStorage.isAuthenticated();
  const isAdmin = AuthStorage.isAdmin();

  const handleAuthRedirect = () => {
    if (isAuthenticated) {
      window.location.href = isAdmin ? "/admin" : "/app";
    } else {
      setLocation("/login");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <RevealOnScroll>
            <div className="px-6 max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Integrate seamlessly with your existing
                <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent"> tools </span>
                <span className="text-gray-700"> & </span>
                <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent">
                  workflows
                </span>
              </h1>
              <p className="text-gray-600 text-lg mb-12">
                VoiceX provides you support with a wide variety of integrations, allowing you to connect your AI Agents with the tools you already use.
              </p>
            </div>
          </RevealOnScroll>

          {/* Integration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {integrations.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <RevealOnScroll key={index}>
                  <div className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 shadow-md hover:shadow-xl hover:shadow-[#FF0066]/10 hover:border-[#FF0066]/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-3 mb-6 flex-shrink-0 shadow-inner group-hover:bg-white transition-colors">
                      <Icon className={`w-full h-full drop-shadow-sm group-hover:scale-110 transition-transform duration-300 ${tech.iconColor}`} />
                    </div>

                    <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight mb-3">
                      {tech.name}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium leading-normal flex-grow">
                      {tech.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/* SYNCED CTA SECTION */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 mt-40">
          <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center text-center gap-6">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-black text-black mb-3 tracking-tight">
                Ready to integrate?
              </h3>
              <p className="text-gray-600 font-medium text-base md:text-lg">
                Join hundreds of businesses scaling with VoiceX AI.
              </p>
            </div>

            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <button
                onClick={handleAuthRedirect}
                className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] hover:bg-right transition-all duration-500 active:scale-95 shadow-md shadow-[#FF0073]/10"
              >
                {isAuthenticated
                  ? (isAdmin ? 'Go to Admin' : 'Go to Dashboard')
                  : t('landing.navbar.signup', 'Get Started')
                }
              </button>
              <button
                onClick={() => setLocation("/contact")}
                className="px-8 py-4 bg-white border border-gray-200 text-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
              >
                {t('landing.navbar.contact', 'Contact Us')}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}