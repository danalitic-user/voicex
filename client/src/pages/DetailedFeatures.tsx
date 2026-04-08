import React from 'react';
import { MicVocal, PhoneCall, Waypoints, Database, CheckCircle2 } from 'lucide-react';

const deepFeatures = [
    {
        id: "tts-asr",
        title: "Natural TTS & ASR",
        subtitle: "Ultra-Realistic Conversational AI",
        description: "Deploy AI agents that sound genuinely human. Our advanced speech synthesis and recognition engines capture emotional nuance, natural pauses, and subtle regional accents across more than 50 languages.",
        bullets: ["Emotional tone matching", "50+ global languages supported", "Ultra-low latency transcription"],
        icon: MicVocal,
        imagePath: "/images/ttr_asr.png",
        reverse: false,
    },
    {
        id: "inbound-outbound",
        title: "Inbound & Outbound",
        subtitle: "Omnidirectional Call Management",
        description: "Never miss a customer inquiry while simultaneously driving new revenue. VoiceX seamlessly balances massive volumes of inbound support resolutions and proactive outbound sales campaigns from a single unified platform.",
        bullets: ["24/7 automated support handling", "High-volume outbound dialing", "Seamless human handoff routing"],
        icon: PhoneCall,
        imagePath: "/images/in_out.png",
        reverse: true,
    },
    {
        id: "custom-workflows",
        title: "Custom Workflows",
        subtitle: "Drag-and-Drop Call Logic",
        description: "Map out complex customer journeys using our intuitive visual canvas. Define branching logic, trigger external actions, and craft perfect conversational fallbacks without writing a single line of code.",
        bullets: ["No-code visual node builder", "Custom API webhook triggers", "Dynamic variable extraction"],
        icon: Waypoints,
        imagePath: "/images/overflow.png",
        reverse: false,
    },
    {
        id: "knowledge-integration",
        title: "Knowledge Integration",
        subtitle: "Dynamic Context & Memory",
        description: "Empower your AI with your company's unique brain. Connect your CRM, upload FAQs, and sync live documents so your agents can provide hyper-specific, accurate answers with absolute confidence.",
        bullets: ["Instant CRM synchronization", "Secure document ingestion", "Zero-hallucination guardrails"],
        icon: Database,
        imagePath: "/images/knowledge.png",
        reverse: true,
    }
];

export default function Features1() {
    return (
        <section className="py-20 bg-white overflow-hidden" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-6">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">Scale</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Dive deep into the tools that power the world's most advanced AI voice agents.
                    </p>
                </div>

                {/* Alternating Feature Blocks */}
                <div className="flex flex-col space-y-32">
                    {deepFeatures.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.id}
                                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${feature.reverse ? 'lg:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Text Content Side */}
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0066]/10 text-[#FF0066] font-bold text-sm">
                                        <Icon className="w-4 h-4" />
                                        {feature.subtitle}
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                                        {feature.title}
                                    </h3>

                                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>

                                    <ul className="space-y-4 pt-4">
                                        {feature.bullets.map((bullet, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-800 font-semibold">
                                                <CheckCircle2 className="w-6 h-6 text-[#FF6633] flex-shrink-0" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Visual Side */}
                                <div className="w-full lg:w-1/2 relative group">
                                    {/* Background Ambient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0066]/20 via-[#FF6633]/20 to-[#FFBB33]/20 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>

                                    {/* Image Container */}
                                    <div className="relative bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-3 md:p-4 overflow-hidden aspect-[16/10] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1">
                                        <img
                                            src={feature.imagePath}
                                            alt={`VoiceX Dashboard showing ${feature.title}`}
                                            className="rounded-3xl object-cover w-full h-full shadow-inner"
                                            // Using 'eager' for the first image to improve LCP, others lazy load
                                            loading={feature.id === 'tts-asr' ? 'eager' : 'lazy'}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}