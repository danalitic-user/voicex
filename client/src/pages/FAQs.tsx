"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is the typical response time for support inquiries?",
        answer: "Our support team typically responds within 24 hours during business days. For urgent matters, we offer priority support for Enterprise customers with response times under 2 hours."
    },
    {
        question: "Can I schedule a demo of the AI voice agents?",
        answer: "Absolutely! Fill out the contact form with your requirements, and our team will reach out to schedule a personalized demo. You can also start with our free trial to experience the platform firsthand."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), as well as ACH transfers and wire transfers for annual enterprise agreements. All payments are securely processed through Stripe."
    }
];

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-50 pb-24 pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* FAQ Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6633]/10 text-[#FF6633] font-bold text-sm">
                        <HelpCircle className="w-4 h-4" />
                        Common Questions
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                        Frequently Asked <span className="text-[#FF6633]">Questions</span>
                    </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                            >
                                <span className="text-lg font-bold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-600 font-medium border-t border-gray-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA (Optional) */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 font-medium">
                        Still have questions? Reach out to our team above.
                    </p>
                </div>
            </div>
        </section>
    );
}