"use client";

import React, { useState } from 'react';
import {
  MicVocal,
  PhoneCall,
  Waypoints,
  Database,
  ChevronRight,
  BarChart3,
  Globe,
  ShieldCheck,
  Blocks
} from 'lucide-react';

// The first 4 items are into the interactive tabs. Clicking each tab changes the rightside board content
const tabbedCapabilities = [
  {
    id: 'tts-asr',
    title: 'Natural TTS & ASR',
    description: 'Human-like voices with emotional expression, 50+ languages, regional accents.',
    icon: MicVocal,
  },
  {
    id: 'in-out',
    title: 'Inbound & Outbound',
    description: 'Handle incoming calls and conduct proactive campaigns simultaneously.',
    icon: PhoneCall,
  },
  {
    id: 'workflows',
    title: 'Custom Workflows',
    description: 'Visual no-code builder for complex call flows and business logic.',
    icon: Waypoints,
  },
  {
    id: 'knowledge',
    title: 'Knowledge Integration',
    description: 'Real-time access to FAQs, docs, and context for intelligent responses.',
    icon: Database,
  }
];

// The next section which contains other 4 capabilities
const gridCapabilities = [
  {
    id: 'analytics',
    title: 'Real-time Analytics',
    description: 'Live dashboards and performance metrics.',
    icon: BarChart3,
  },
  {
    id: 'global',
    title: 'Global Scale',
    description: '30+ languages with zero latency.',
    icon: Globe,
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'HIPAA, GDPR, SOC2 compliant.',
    icon: ShieldCheck,
  },
  {
    id: 'integrations',
    title: '100+ Integrations',
    description: 'Salesforce, Zendesk, Slack & more.',
    icon: Blocks,
  }
];

export default function CoreCapabilities() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="core-capabilities" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-6">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">Capabilities</span>
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Everything you need to deploy enterprise-grade voice AI in minutes, not months.
          </p>
        </div>

        {/* The Interactive Tabs Logic */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {tabbedCapabilities.map((item, index) => {
              const isActive = activeFeature === index;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveFeature(index)}
                  className={`text-left px-6 py-5 rounded-2xl transition-all duration-300 font-bold text-lg flex items-center justify-between group ${isActive
                    ? 'bg-white text-black shadow-md border border-gray-100 ring-1 ring-[#FF0066]/20'
                    : 'bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900 border border-transparent'
                    }`}
                >
                  <span>{item.title}</span>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-[#FF0066] translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:opacity-50'
                      }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-square md:aspect-video bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex items-center justify-center p-8 group">

              <div className="absolute inset-0 opacity-[0.04] bg-gradient-to-br from-[#FF0066] via-[#FF6633] to-[#FFBB33] pointer-events-none"></div>

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {tabbedCapabilities.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeFeature === index;

                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-4 scale-95 pointer-events-none -z-10'
                        }`}
                    >
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#FF0066]/10 to-[#FFBB33]/20 flex items-center justify-center mb-8 shadow-inner border border-white/50 backdrop-blur-sm">
                        <Icon
                          className="w-16 h-16 md:w-20 md:h-20 text-transparent"
                          style={{
                            stroke: 'url(#danalitic-gradient)',
                            strokeWidth: 1.5
                          }}
                        />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-4">
                        {item.title}
                      </h3>

                      <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Danalitic Gradient here */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="danalitic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#FF0066" offset="0%" />
                    <stop stopColor="#FF6633" offset="50%" />
                    <stop stopColor="#FFBB33" offset="100%" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Next section -> 2x2 Grid */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {gridCapabilities.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient Border Effect when hovered */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[2px] m-[-2px]"></div>

                  {/* Card Content */}
                  <div className="h-full w-full bg-white rounded-3xl relative z-10 flex flex-col justify-start p-2">
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF0066]/10 to-[#FFBB33]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[#FF0066]" />
                    </div>

                    {/* Features paragraph */}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}