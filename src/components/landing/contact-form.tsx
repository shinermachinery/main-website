"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { submitContactForm } from "@/actions/submit-contact";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage({ type: null, text: "" });

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setResponseMessage({ type: "success", text: result.message });
        // Reset form
        setFormData({ name: "", email: "", contactNumber: "", message: "" });
      } else {
        setResponseMessage({ type: "error", text: result.message });
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="py-40"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout - Heading and Form Side by Side */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left Column - Heading with Button */}
            <div className="flex-1 flex flex-col gap-6">
              <h2
                id="contact-heading"
                className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-primary"
              >
                Get in touch for quotes, demos, or technical guidance.
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full h-10 font-medium text-sm leading-5 w-fit"
                style={{
                  background: "linear-gradient(90.88deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%)",
                  boxShadow: "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.4)",
                }}
              >
                <span
                  className="bg-clip-text"
                  style={{
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(90.59deg, #2a5e98 15.88%, #18b75a 115.02%)",
                  }}
                >
                  Contact Sales
                </span>
              </button>
            </div>

            {/* Right Column - Form */}
            <div className="flex-1 bg-background border border-border rounded-[24px] p-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {/* Full Name Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-medium text-sm leading-5 text-primary"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    className="w-full h-12 px-4 rounded-xl bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-medium text-sm leading-5 text-primary"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    className="w-full h-12 px-4 rounded-xl bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Contact Number Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contactNumber"
                    className="font-medium text-sm leading-5 text-primary"
                  >
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    className="w-full h-12 px-4 rounded-xl bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    placeholder="Enter your contact number"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-medium text-sm leading-5 text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                {/* Response Message */}
                {responseMessage.type && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      responseMessage.type === "success"
                        ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                  >
                    {responseMessage.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">
                      {responseMessage.text}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex gap-2 h-12 items-center justify-center px-6 rounded-full w-full relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: "linear-gradient(88.66deg, #2a5e98 27.51%, #18b75a 115.04%)",
                  }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 text-white animate-spin relative z-10" />
                      <span className="text-sm font-medium leading-5 text-white relative z-10">
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium leading-5 text-white relative z-10">
                        Send Message
                      </span>
                      <ArrowRight className="h-4 w-4 text-white relative z-10" />
                    </>
                  )}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
