// Contact Section at end of the landing page

"use client";

import React, { useState } from "react";
import { Send, Loader2, MessageSquare } from "lucide-react";

// Logic for form submission using web3forms.com API Key
export default function ContactPage() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "35fe4229-b630-4c24-8d78-d95c4a90a36e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch (error) {
      setResult("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0066]/10 text-[#FF0066] font-bold text-sm">
            <MessageSquare className="w-4 h-4" />
            We're here to help
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33]">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Have questions about VoiceX? Our team is ready to help you scale your voice automation.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8 md:p-12 lg:p-16">
          <form className="space-y-6" onSubmit={onSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-gray-900 block">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#FF0066] focus:border-[#FF0066] block p-3.5 transition-colors outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-900 block">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#FF0066] focus:border-[#FF0066] block p-3.5 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-gray-900 block">Message for us</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="How can we help you scale your automation?"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#FF0066] focus:border-[#FF0066] block p-3.5 transition-colors outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] hover:bg-right shadow-md hover:shadow-lg hover:shadow-[#FF0073]/20 transition-all duration-500 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>

            {/* Success/Error Message Display */}
            {result && (
              <div className={`text-center mt-6 font-bold px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 ${result.includes("Successfully")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                {result}
              </div>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}