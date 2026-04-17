'use client';

import React from 'react';
import { useLocation } from "wouter";
import { useTranslation } from 'react-i18next';
import { AuthStorage } from "@/lib/auth-storage";
import {
    TrendingUp,
    Headset,
    CalendarCheck,
    MessageSquare,
    Building2
} from 'lucide-react';

const functionalCases = [
    {
        title: "Sales & Lead Qualification",
        description: "Auto-qualify leads, book meetings, and nurture prospects with zero manual effort.",
        icon: TrendingUp,
        gridSpan: "lg:col-span-3",
    },
    {
        title: "Customer Support Automation",
        description: "Handle tier-1 support, troubleshooting, and escalation with seamless human handoff.",
        icon: Headset,
        gridSpan: "lg:col-span-3",
    },
    {
        title: "Appointment Booking",
        description: "Automate scheduling, reminders, and confirmations for healthcare and service industries.",
        icon: CalendarCheck,
        gridSpan: "lg:col-span-2",
    },
    {
        title: "Surveys & Feedback",
        description: "Collect customer feedback, NPS scores, and satisfaction data seamlessly at scale.",
        icon: MessageSquare,
        gridSpan: "lg:col-span-2",
    },
    {
        title: "Enterprise Contact Centers",
        description: "Replace manual, expensive call centers with AI agents for true 24/7 availability.",
        icon: Building2,
        gridSpan: "lg:col-span-2",
    }
];

export default function UseCases2() {
    const [, setLocation] = useLocation();
    const { t } = useTranslation();

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
        <section className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
                        Automate every touchpoint
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">
                        From the first cold call to post-resolution feedback, VoiceX handles the entire customer lifecycle.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {functionalCases.map((useCase, index) => {
                        const Icon = useCase.icon;
                        return (
                            <div
                                key={index}
                                className={`${useCase.gridSpan} group relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#FF0066]/[0.02] to-[#FFBB33]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:border-[#FF0066]/20 group-hover:bg-[#FF0066]/5 transition-colors duration-300 shadow-sm">
                                        <Icon className="w-7 h-7 text-gray-700 group-hover:text-[#FF0066] transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF0066] group-hover:to-[#FF6633] transition-all duration-300 w-fit">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-gray-600 font-medium leading-relaxed mt-auto">
                                        {useCase.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 mt-40">
                <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 md:p-12 flex flex-col items-center text-center gap-6">

                    <div className="max-w-2xl">
                        <h3 className="text-3xl md:text-4xl font-black text-black mb-3 tracking-tight">
                            Ready to scale your business?
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