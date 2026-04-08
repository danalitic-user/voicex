"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiOpenai, SiTwilio, SiStripe, SiPaypal,
    SiSalesforce, SiHubspot, SiZendesk
} from 'react-icons/si';
import { Mic, PhoneCall, Wallet, Mail, Webhook } from 'lucide-react';

const timelineEvents = [
    { id: "openai", name: "OpenAI Realtime", icon: SiOpenai, color: "text-white", desc: "Intent analysis activates for late-night bulk campaign triggers. GPT-4 processes context." },
    { id: "elevenlabs", name: "ElevenLabs", icon: Mic, color: "text-gray-300", desc: "Acoustic synthesis begins for scheduled outreach. Custom personalities activate." },
    { id: "twilio", name: "Twilio", icon: SiTwilio, color: "text-[#F22F46]", desc: "Global carrier connect. Provisioning local numbers for international outreach." },
    { id: "plivo", name: "Plivo Telecom", icon: PhoneCall, color: "text-[#00B266]", desc: "Regional carrier connect. India-specific calling routing optimized." },
    { id: "salesforce", name: "Salesforce CRM", icon: SiSalesforce, color: "text-[#00A1E0]", desc: "Handoff: Call data sync for seamless agent connect. Logging activity." },
    { id: "hubspot", name: "HubSpot", icon: SiHubspot, color: "text-[#FF7A59]", desc: "Handoff: Ticket creation based on real-time transcript analysis." },
    { id: "zendesk", name: "Zendesk", icon: SiZendesk, color: "text-[#03363D]", desc: "Handoff: Escalation routing via RAG-powered document understanding." },
    { id: "webhooks", name: "Webhooks", icon: Webhook, color: "text-[#FF0066]", desc: "Event: Call complete. Push real-time analytics to external BI systems." },
    { id: "stripe", name: "Stripe Payments", icon: SiStripe, color: "text-[#635BFF]", desc: "System: Recurring billing and Low credit top-up processing." },
    { id: "paypal", name: "PayPal Global", icon: SiPaypal, color: "text-[#00457C]", desc: "Multi-currency check. Global payment processing verified." },
    { id: "razorpay", name: "Razorpay", icon: Wallet, color: "text-[#3395FF]", desc: "Regional payment check. India-specific UPI processing complete." },
    { id: "smtp", name: "SMTP Email", icon: Mail, color: "text-amber-500", desc: "Dispatch: Automated post-call summary emails and receipts sent." }
];
const ANIMATION_SPEED_MS = 3000;

export default function IntegrationTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Infinite Auto-play logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % timelineEvents.length);
        }, ANIMATION_SPEED_MS);

        return () => clearInterval(interval);
    }, []);

    const activeEvent = timelineEvents[activeIndex];
    const ActiveIcon = activeEvent.icon;

    return (
        <section className="py-24 bg-gray-900 text-white overflow-hidden border-y border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        Seemless <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FFBB33]"> Integrations </span>
                        that power your tools
                    </h2>
                    <p className="text-gray-400 font-medium">
                        VoiceX Integrates with the tools you already use allowing you a seemless experience.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

                    {/* LEFT COLUMN: The Animated Timeline */}
                    <div className="w-full lg:w-1/2 relative py-10">
                        {/* The vertical track line */}
                        <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-gray-800 rounded-full" />

                        {/* The glowing energy line that fills up */}
                        <motion.div
                            className="absolute left-[39px] top-0 w-0.5 bg-gradient-to-b from-[#FF0066] to-[#FFBB33] shadow-[0_0_15px_#FF0066] rounded-full origin-top"
                            animate={{ height: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />

                        {/* The Timeline Nodes */}
                        <div className="space-y-8 relative z-10">
                            {timelineEvents.map((event, index) => {
                                const isActive = index === activeIndex;
                                const isPast = index < activeIndex;
                                const Icon = event.icon;

                                return (
                                    <div key={event.id} className="flex items-center gap-6">
                                        {/* Node Circle */}
                                        <div className="relative">
                                            {/* Pulsing ring for active state */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeRing"
                                                    className="absolute -inset-2 rounded-full border border-[#FF0066] bg-[#FF0066]/20"
                                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}

                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 relative z-10
                                                ${isActive ? 'bg-gray-900 border-[#FF0066] text-[#FF0066]' :
                                                    isPast ? 'bg-[#FF0066] border-[#FF0066] text-white' :
                                                        'bg-gray-900 border-gray-700 text-gray-600'}
                                            `}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Node Label */}
                                        <div className={`font-bold transition-colors duration-500 ${isActive ? 'text-white text-lg' : isPast ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {event.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Analytic Console Display */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32 space-y-8">

                        {/* The changing blurb box */}
                        <div className="bg-gray-800/50 border border-gray-700 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden h-[350px] flex flex-col justify-center">

                            {/* Ambient glow inside the box */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0066]/10 rounded-full blur-3xl" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeEvent.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF0066] to-[#FFBB33] p-0.5">
                                            <div className="w-full h-full bg-gray-900 rounded-[14px] flex items-center justify-center">
                                                <ActiveIcon className="w-8 h-8 text-[#FFBB33]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white tracking-tight">
                                                {activeEvent.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-xl text-gray-300 font-medium leading-relaxed">
                                        {activeEvent.desc}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}