"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/submit-contact";
import { GradientButton } from "@/components/ui/gradient-button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        setFormData({ name: "", email: "", message: "" });
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
      className="py-24 md:py-32 bg-background"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={isPending}
                required
                className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
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
                className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
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
                className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            {/* Response Message */}
            {responseMessage.type && (
              <div
                className={`flex items-center gap-3 p-4 rounded-xl ${
                  responseMessage.type === "success"
                    ? "bg-brand-green-10 text-brand-green border border-brand-green/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}
              >
                {responseMessage.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{responseMessage.text}</p>
              </div>
            )}

            {/* Submit Button */}
            <GradientButton
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full md:w-auto md:min-w-[200px]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Send Message
                </>
              )}
            </GradientButton>
          </form>
        </div>
      </div>
    </section>
  );
}
