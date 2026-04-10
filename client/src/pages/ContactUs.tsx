import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
export default function Contact() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending....");

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "9c7fc5cd-f463-4996-9cfd-fadd22968209");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                (event.target as HTMLFormElement).reset();
            } else {
                setResult(data.message);
            }
        } catch (error) {
            setResult("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-20 pb-20 bg-white font-jakarta relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-6">
                        Contact Us
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Have questions? We'd love to answer them.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Full Name"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                required
                            />
                            <FormInput
                                label="Email Address"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        <FormInput
                            label="Message for us"
                            id="message"
                            name="message"
                            textarea
                            placeholder="How can we help you?"
                            required
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] hover:bg-right shadow-none hover:shadow-lg hover:shadow-[#FF0073]/30 transition-all duration-500 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>

                        {result && (
                            <p className={`text-center mt-4 font-bold ${result.includes("Successfully") ? "text-green-600" : "text-red-600"}`}>
                                {result}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}