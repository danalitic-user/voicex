"use client";

import React, { useState } from 'react';
import {
    Headset, Target, HeartPulse, Landmark,
    BarChart3, Globe, ShieldCheck, Blocks, CheckCircle2, ArrowRight
} from 'lucide-react';

const highlights = [
    { name: "Real-time Analytics", icon: BarChart3 },
    { name: "30+ Languages", icon: Globe },
    { name: "Enterprise Security", icon: ShieldCheck },
    { name: "100+ Integrations", icon: Blocks },
];

const industries = [
    {
        id: "support",
        title: "Customer Support",
        tabLabel: "Support",
        description: "Eliminate hold times and resolve tier-1 tickets instantly. VoiceX acts as your frontline defense, handling repetitive queries so your human agents can focus on complex escalations.",
        bullets: ["24/7 Automated resolution", "Seamless live-agent handoff", "Instant CRM ticket creation"],
        icon: Headset,

        theme: {
            activeTab: "bg-blue-500 text-white border-blue-500 shadow-blue-500/25",
            iconBg: "bg-blue-50",
            iconText: "text-blue-500",
            button: "bg-blue-500 hover:bg-blue-600"
        }
    },
    {
        id: "sales",
        title: "Sales & Outreach",
        tabLabel: "Sales",
        description: "Scale your outbound campaigns infinitely. Our AI agents can dial thousands of leads per minute, pre-qualify prospects, and book meetings directly onto your sales team's calendars.",
        bullets: ["High-volume cold calling", "Automated lead qualification", "Direct calendar scheduling"],
        icon: Target,

        theme: {
            activeTab: "bg-[#FF0066] text-white border-[#FF0066] shadow-[#FF0066]/25",
            iconBg: "bg-[#FF0066]/10",
            iconText: "text-[#FF0066]",
            button: "bg-[#FF0066] hover:bg-[#FF0066]/90"
        }
    },
    {
        id: "healthcare",
        title: "Healthcare",
        tabLabel: "Healthcare",
        description: "Streamline patient communications securely. Automate appointment reminders, process basic triage questions, and conduct post-discharge follow-ups while maintaining strict HIPAA compliance.",
        bullets: ["HIPAA-compliant infrastructure", "Automated appointment reminders", "Patient feedback collection"],
        icon: HeartPulse,

        theme: {
            activeTab: "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/25",
            iconBg: "bg-emerald-50",
            iconText: "text-emerald-500",
            button: "bg-emerald-500 hover:bg-emerald-600"
        }
    },
    {
        id: "finance",
        title: "Financial Services",
        tabLabel: "Finance",
        description: "Deliver secure, private, and instant financial support. Automate payment collection calls, verify suspicious account activity, and provide balance inquiries with bank-grade security.",
        bullets: ["SOC2 & PCI compliance", "Fraud verification alerts", "Automated payment reminders"],
        icon: Landmark,

        theme: {
            activeTab: "bg-purple-600 text-white border-purple-600 shadow-purple-600/25",
            iconBg: "bg-purple-50",
            iconText: "text-purple-600",
            button: "bg-purple-600 hover:bg-purple-700"
        }
    }
];

export default function UseCases1() {

    const [activeTab, setActiveTab] = useState(industries[0].id);


    const activeData = industries.find(ind => ind.id === activeTab) || industries[0];
    const ActiveIcon = activeData.icon;

    return (
        <section className="py-10 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* 1. Main Header */}
                <div className="text-center max-w-4xl mx-auto mb-10 space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight">
                        AI Voice Agents that <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">
                            Scale your Business
                        </span>
                    </h2>

                    {/* The 4 Feature Pills (Static) */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-600 font-semibold text-sm"
                                >
                                    <Icon className="w-4 h-4 text-gray-400" />
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. The Interactive Industry Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
                    {industries.map((industry) => {
                        const TabIcon = industry.icon;
                        const isActive = activeTab === industry.id;

                        return (
                            <button
                                key={industry.id}
                                onClick={() => setActiveTab(industry.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 border shadow-sm
                                    ${isActive
                                        ? industry.theme.activeTab
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }
                                `}
                            >
                                <TabIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                                {industry.title}
                            </button>
                        );
                    })}
                </div>

                {/* 3. The Active Content Card */}
                <div key={activeTab} className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">

                        {/* Left Side */}
                        <div className="w-full lg:w-3/5 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                                    {activeData.title}
                                </h3>
                                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                    {activeData.description}
                                </p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                {activeData.bullets.map((bullet, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${activeData.theme.iconText}`} />
                                        <span className="text-gray-800 font-semibold text-base">
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <button className={`flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-all shadow-lg hover:-translate-y-1 ${activeData.theme.button}`}>
                                    Explore {activeData.tabLabel} Solutions
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="w-full lg:w-2/5 flex justify-center">
                            <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] ${activeData.theme.iconBg} flex items-center justify-center transform transition-transform hover:scale-105 duration-500`}>
                                {/* Soft background rings for depth */}
                                <div className="absolute inset-4 rounded-[2.5rem] bg-white/40 backdrop-blur-sm border border-white/50"></div>
                                <div className="absolute inset-8 rounded-[2rem] bg-white/60 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-inner">
                                    <ActiveIcon className={`w-32 h-32 ${activeData.theme.iconText} drop-shadow-md`} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}