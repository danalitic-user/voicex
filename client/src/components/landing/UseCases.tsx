/**
 * ============================================================
 * © 2026 VoiceX - A Danaltic Product. All rights reserved.
 * Original Author: Danalitic Engineering Team
 * Website: https://danalitic.in
 *
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import React from 'react';
import { Target, Headset, CalendarCheck, ClipboardList } from 'lucide-react';

// 2x2 Grid for Use Cases Section
const useCases = [
  {
    title: "Sales & Lead Qualification",
    description: "Auto-qualify leads, book meetings, and nurture prospects with zero manual effort.",
    icon: Target,
  },
  {
    title: "Customer Support Automation",
    description: "Handle tier-1 support, troubleshooting, and escalation with human handoff.",
    icon: Headset,
  },
  {
    title: "Appointment Booking",
    description: "Automate scheduling, reminders, and confirmations for healthcare and services.",
    icon: CalendarCheck,
  },
  {
    title: "Surveys & Feedback",
    description: "Collect customer feedback, NPS scores, and satisfaction data at scale.",
    icon: ClipboardList,
  }
];

export default function UseCases() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
            Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">Cases</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Real-world applications across industries
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              // The Card Wrapper
              <div
                key={index}
                className="group relative p-8 rounded-3xl transition-all duration-300 z-0 flex flex-col h-full"
              >
                {/* 1. The Ambient Glow (Expands outwards on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF0066]/40 via-[#FF6633]/20 to-[#FFBB33]/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.04] -z-20"></div>

                {/* 2. The Solid White Background (Stays fixed to protect text readability) */}
                <div className="absolute inset-0 bg-white rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300 -z-10"></div>

                {/* 3. Content Container */}
                <div className="relative z-10 flex flex-col flex-grow">

                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF0066]/10 to-[#FFBB33]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#FF0066]" />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {useCase.description}
                  </p>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}