"use client";

import React from 'react';
import { useLocation, Link } from 'wouter';
import {
  MessageSquareText,
  PhoneForwarded,
  Workflow,
  MailCheck,
  MessageCircle,
  CalendarClock,
  ArrowRight
} from 'lucide-react';
import { AuthStorage } from "@/lib/auth-storage";

const automationTasks = [
  {
    title: "Instant SMS Follow-ups",
    description: "Trigger text messages mid-conversation to send links, confirmation codes, or quick summaries.",
    icon: MessageSquareText,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Smart Human Escalation",
    description: "Seamlessly route complex inquiries to live representatives with full conversational context attached.",
    icon: PhoneForwarded,
    color: "text-[#FF0066]",
    bg: "bg-[#FF0066]/10",
  },
  {
    title: "Zapier & Webhook Sync",
    description: "Capture lead data in real-time and push it instantly to thousands of external apps and CRMs.",
    icon: Workflow,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Automated Email Dispatch",
    description: "Generate and send personalized email receipts, quotes, or post-call summaries without lifting a finger.",
    icon: MailCheck,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "WhatsApp Integration",
    description: "Push secure WhatsApp notifications, documents, and rich media directly to the customer's phone.",
    icon: MessageCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Calendar & Scheduling",
    description: "Let the AI check availability, book meetings directly onto your calendar, and send automated invites.",
    icon: CalendarClock,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  }
];

export default function TaskAutomation() {
  const [, setLocation] = useLocation();
  const isAuthenticated = AuthStorage.isAuthenticated();
  const isAdmin = AuthStorage.isAdmin();

  // Logic matching your Navbar redirect behavior
  const handleActionRedirect = () => {
    if (isAuthenticated) {
      setLocation(isAdmin ? "/admin" : "/app");
    } else {
      setLocation("/login");
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Side: Sticky Header & CTA */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0066]/10 text-[#FF0066] font-bold text-sm">
              <Workflow className="w-4 h-4" />
              Execute on the Fly
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Instant Task <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">
                Automation
              </span>
            </h2>

            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Empower your AI agents to do more than just talk. Configure complex business logic and background tasks to execute perfectly in real-time without ever interrupting the conversation.
            </p>

            <div className="pt-4">
              <button
                onClick={handleActionRedirect}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-[#FF0066] to-[#FF6633] hover:opacity-90 shadow-lg shadow-[#FF0066]/25 transition-all duration-300 hover:-translate-y-1"
              >
                Build Your First Workflow
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side: The 6 Action Cards */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {automationTasks.map((task, index) => {
                const Icon = task.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-xl hover:shadow-[#FF0066]/5 hover:border-[#FF0066]/20 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${task.bg}`}>
                      <Icon className={`w-6 h-6 ${task.color}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
                      {task.title}
                    </h3>

                    <p className="text-gray-600 font-medium text-sm leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}