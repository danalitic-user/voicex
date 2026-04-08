import React from 'react';
import { useLocation } from "wouter";
import { useTranslation } from 'react-i18next';
import { AuthStorage } from "@/lib/auth-storage";
import {
    Mic, Globe, Zap, UserCog,
    Server, PhoneCall, PhoneForwarded, FileText,
    Waypoints, CalendarClock, RotateCw, LineChart,
    Blocks, Database, ShieldCheck, Webhook
} from 'lucide-react';

const featureCategories = [
    {
        title: "Advanced Bulk Calling",
        features: [
            {
                title: "CSV Import",
                description: "Upload thousands of contacts instantly for high-volume outreach.",
                icon: Database
            },
            {
                title: "Smart Scheduling",
                description: "Schedule calls based on preferred time ranges and timezones.",
                icon: CalendarClock
            },
            {
                title: "Auto-Retry Logic",
                description: "Adjust retry attempts automatically for failed or unanswered calls.",
                icon: RotateCw
            },
            {
                title: "Queue Management",
                description: "Monitor pending, processing, and completed calls in real-time.",
                icon: Waypoints
            }
        ]
    },
    {
        title: "Intelligent AI Agents",
        features: [
            {
                title: "Natural TTS",
                description: "Life-like conversations powered by ElevenLabs voice technology.",
                icon: Mic
            },
            {
                title: "Custom Personas",
                description: "Tailor tones (Friendly, Formal) and temperature for creative responses.",
                icon: UserCog
            },
            {
                title: "Knowledge Base",
                description: "RAG management for PDF, DOC, and URL website integration.",
                icon: Server
            },
            {
                title: "Contextual AI",
                description: "Agents intelligently reference stored knowledge for accurate answers.",
                icon: Zap
            }
        ]
    },
    {
        title: "Comprehensive Analytics",
        features: [
            {
                title: "Real-Time Dashboard",
                description: "Monitor campaign performance, connection rates, and drop-offs live.",
                icon: LineChart
            },
            {
                title: "Lead Qualification",
                description: "Automatic Hot/Warm/Cold scoring based on AI sentiment analysis.",
                icon: ShieldCheck
            },
            {
                title: "Call Recording",
                description: "Automatic capture with AI transcriptions and keyword extraction.",
                icon: FileText
            },
            {
                title: "Trend Reporting",
                description: "Compare performance across months and export as CSV or PDF.",
                icon: PhoneCall
            }
        ]
    },
    {
        title: "Workflow & Integrations",
        features: [
            {
                title: "Webhook Support",
                description: "Push call events and lead data to your CRM or internal apps.",
                icon: Webhook
            },
            {
                title: "Dynamic Responses",
                description: "AI reacts and routes calls based on specific user answers.",
                icon: PhoneForwarded
            },
            {
                title: "CRM Integration",
                description: "Native-friendly syncing for qualification and sentiment updates.",
                icon: Blocks
            },
            {
                title: "Smart Distribution",
                description: "Load balancing across multiple keys for optimal calling windows.",
                icon: Globe
            }
        ]
    }
];

export default function Features2() {
    const [, setLocation] = useLocation();
    const { t } = useTranslation();

    const isAuthenticated = AuthStorage.isAuthenticated();
    const isAdmin = AuthStorage.isAdmin();

    // Synced logic with your Navbar
    const handleAuthRedirect = () => {
        if (isAuthenticated) {
            window.location.href = isAdmin ? "/admin" : "/app";
        } else {
            setLocation("/login");
        }
    };

    return (
        <section className="py-24 bg-gray-50 border-y border-gray-100" id="more-features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
                        Engineered to manage every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">customer touchpoint</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">
                        Delivering high-performance, enterprise-grade voice AI that scales with your customer support demands.
                    </p>
                </div>

                {/* 2x2 Grid for Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {featureCategories.map((category, catIndex) => (
                        <div
                            key={catIndex}
                            className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF0066]"></div>
                                <h3 className="text-xl font-bold text-[#FF0066]">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                                {category.features.map((feature, featIndex) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={featIndex} className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF0066]/10 transition-colors duration-300">
                                                <Icon className="w-5 h-5 text-gray-600 group-hover:text-[#FF0066] transition-colors duration-300" />
                                            </div>

                                            <div>
                                                <h4 className="text-base font-bold text-gray-900 mb-1">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section - Logic synced with your Navbar */}
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