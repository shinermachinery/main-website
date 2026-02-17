"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { submitContactForm } from "@/actions/submit-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    <section id="contact" className="py-40" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left Column - Heading with Button */}
            <div className="flex-1 flex flex-col gap-6">
              <h2
                id="contact-heading"
                className="font-medium text-2xl text-primary"
              >
                Get in touch for quotes, demos, or technical guidance.
              </h2>
              <Button
                className="w-fit"
                variant="shiner"
                size="lg"
              >
                Contact Sales
              </Button>
            </div>

            {/* Right Column - Form */}
            <div className="flex-1 bg-background border border-border rounded-2xl p-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    className="h-12 px-4 rounded-xl bg-secondary border-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    className="h-12 px-4 rounded-xl bg-secondary border-none"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    className="h-12 px-4 rounded-xl bg-secondary border-none"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                    rows={6}
                    className="px-4 py-3 rounded-xl bg-secondary border-none resize-none"
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
                      <CheckCircle2 className="size-5 shrink-0" />
                    ) : (
                      <AlertCircle className="size-5 shrink-0" />
                    )}
                    <p className="text-sm font-medium">
                      {responseMessage.text}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="shiner"
                  className="h-12 w-full rounded-full"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
