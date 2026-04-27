'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { useLocation } from "wouter";
import { useTranslation } from 'react-i18next';
import { AuthStorage } from "@/lib/auth-storage";

const pricingTiers = [
    {
        name: "Starter",
        target: "For small businesses and teams",
        price: "FREE",
        billing: "/month",
        calls: "Single Agent/month",
        features: [
            "Single Campaign",
            "10 Max Contacts",
            "Own Phone Numbers",
            "Choose LLM Model",
            "2 Flow builder",
            "3 documents",
            "2 Webhook Integrations",
            "2 Website Widget"
        ],
        buttonText: "Start Free Trial",
        buttonStyle: "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        popular: false,
    },
    {
        name: "Pro",
        target: "For growing businesses",
        price: "$99",
        billing: "/month",
        calls: "25 Agents/month",
        features: [
            "50 Campaigns",
            "1000 Max Contacts",
            "Own Phone Numbers",
            "Choose LLM Model",
            "25 Flow builder",
            "25 documents",
            "20 Webhook Integrations",
            "2 Website Widget",
            "Priority Support"
        ],
        buttonText: "Contact Sales",
        buttonStyle: "bg-gradient-to-r from-[#FF0066] to-[#FF6633] text-white hover:opacity-90 shadow-lg shadow-[#FF0066]/25 border-none",
        popular: true,
    },
    {
        name: "Enterprise",
        target: "For enterprises at scale",
        price: "$199",
        billing: "/month",
        calls: "Unlimited volume",
        features: [
            "Unlimited campaigns",
            "Unlimited Contacts",
            "Own Phone Numbers",
            "Choose LLM Model",
            "Unimited Flow builder",
            "Unlimited documents",
            "High Volume Webhook Integrations",
            "Unlimited Website Widget",
            "Personalized Support"
        ],
        buttonText: "Contact Sales",
        buttonStyle: "bg-gray-900 text-white border border-transparent hover:bg-gray-800",
        popular: false,
    }
];

export default function Pricing1() {
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
        <section className="py-10 bg-white relative overflow-hidden" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
                        Work Smarter, Spend Better
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Start for free, then scale alongside your business. No hidden fees.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-30">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative rounded-3xl bg-white flex flex-col h-full transition-transform duration-300 hover:-translate-y-2
                                ${tier.popular
                                    ? "p-1 md:scale-105 z-10 shadow-2xl"
                                    : "border border-gray-200 p-8 shadow-sm"
                                }
                            `}
                        >
                            {tier.popular && (
                                <div className="absolute inset-0 bg-gradient-to-b from-[#FF0066] to-[#FFBB33] rounded-3xl -z-10"></div>
                            )}

                            <div className={`flex flex-col h-full ${tier.popular ? "bg-white rounded-[1.4rem] p-8" : ""}`}>
                                {tier.popular && (
                                    <div className="absolute -top-5 left-0 right-0 flex justify-center">
                                        <div className="bg-gradient-to-r from-[#FF0066] to-[#FF6633] text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                                            <Zap className="w-4 h-4" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">{tier.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium h-10">{tier.target}</p>
                                    <div className="mt-6 flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-gray-900 tracking-tight">{tier.price}</span>
                                        <span className="text-lg text-gray-500 font-semibold">{tier.billing}</span>
                                    </div>
                                </div>

                                <div className={`px-4 py-3 rounded-xl mb-8 text-center font-bold text-sm
                                    ${tier.popular ? "bg-[#FF0066]/10 text-[#FF0066]" : "bg-gray-50 text-gray-700"}
                                `}>
                                    {tier.calls}
                                </div>

                                <div className="flex-grow space-y-4 mb-8">
                                    {tier.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 
                                                ${tier.popular ? "text-[#FF0066]" : "text-gray-400"}
                                            `} />
                                            <span className="text-gray-700 font-medium text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={tier.name === "Pro" || tier.name === "Enterprise" ? () => setLocation("/contact") : handleAuthRedirect}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${tier.buttonStyle}`}
                                >
                                    {tier.buttonText}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA Section */}
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
        </section>
    );
}