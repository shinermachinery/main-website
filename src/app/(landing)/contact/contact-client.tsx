"use client";

import { Mail, Phone } from "lucide-react";
import { useState, useTransition } from "react";
import { siteConfig } from "@/lib/site-config";
import type { ContactPageData } from "@/sanity/lib/actions";
import { submitContactForm } from "./actions";

const { contactPage } = siteConfig;

interface ContactPageClientProps {
  data: ContactPageData;
}

export function ContactPageClient({ data }: ContactPageClientProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", contactNumber: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
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
    <div className="bg-background">
      {/* Contact Form Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-10">
          {/* Left Column - Heading & Contact Info */}
          <div className="flex w-full flex-col gap-6 lg:w-1/2">
            <h1 className="text-2xl font-medium text-foreground md:text-3xl">
              {contactPage.heading}
            </h1>
            <p className="text-sm text-muted-foreground">
              {contactPage.subtitle}
            </p>

            {/* Get In Touch Card */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-secondary p-5">
              <h2 className="text-base font-semibold text-foreground">
                {contactPage.getInTouchTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {contactPage.getInTouchDescription}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.phoneNumbers.map((phone, i) => (
                  <a
                    key={`phone-${i}`}
                    href={`tel:${phone.number.replace(/[\s-]/g, "")}`}
                    className="flex items-center gap-2 text-sm text-foreground transition-colors hover:text-brand-blue"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {phone.number}
                  </a>
                ))}
                {data.emails.map((email, i) => (
                  <a
                    key={`email-${i}`}
                    href={`mailto:${email.email}`}
                    className="flex items-center gap-2 text-sm text-foreground transition-colors hover:text-brand-blue"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {email.email}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-1 flex-col gap-7 rounded-3xl border border-border bg-background p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-primary"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-primary"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sample@email.com"
                  required
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contactNumber"
                  className="text-sm font-semibold text-primary"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+91-90443 20555"
                  required
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-primary"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={4}
                  required
                  className="min-h-24 rounded-2xl bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="flex h-13 w-full items-center justify-center rounded-full px-4 py-2 transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(88.66deg, var(--brand-blue) 27.509%, var(--brand-green) 115.04%)",
                  boxShadow:
                    "inset 0px 4px 29px 0px rgba(244, 244, 245, 0.2)",
                }}
              >
                <span className="text-sm font-semibold text-white">
                  {isPending ? "Sending..." : "Get a Solution"}
                </span>
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-center text-sm text-brand-green">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-600">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      {data.offices.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.offices.map((office, i) => (
              <div key={`office-${i}`} className="flex h-full flex-col gap-4">
                <div className="flex min-h-24 flex-col gap-2">
                  <h3 className="text-lg font-medium text-foreground">
                    {office.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {office.address}
                  </p>
                </div>
                {office.mapEmbedUrl && (
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-3xl border border-border">
                    <div className="absolute inset-x-0 top-0 z-10 h-1 bg-linear-to-r from-brand-blue to-brand-green" />
                    <iframe
                      src={office.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${office.name} Location`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
