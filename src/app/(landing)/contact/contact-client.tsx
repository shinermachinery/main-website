"use client";

import { Mail, Phone } from "lucide-react";
import { useState, useTransition } from "react";

export function ContactPageClient() {
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
      // TODO: Implement actual form submission with server action
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setFormData({ fullName: "", email: "", contactNumber: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
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
    <div className="bg-secondary">
      {/* Main Content */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
        {/* Hero Section & Form */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Left Column */}
          <div className="flex flex-1 flex-col gap-10">
            {/* Heading */}
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-medium leading-[48px] tracking-[-0.9px] text-gray-900 md:text-[36px]">
                Let's Build Better Production Together
              </h1>
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-500 md:text-[20px]">
                Get in touch with our team for quotes, demos, or technical
                support.
              </p>
            </div>

            {/* Get In Touch Card */}
            <div className="flex flex-col gap-6 rounded-2xl bg-gray-50 p-5">
              {/* Header */}
              <div className="flex flex-col gap-6">
                <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                  Get In Touch
                </p>
                <p className="text-sm leading-5 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Et semper sed lacus
                  dignissim senectus nullam eget. At dolor purus orci sit.
                  Turpis vitae mattis egestas quis etiam.
                </p>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Phone 1 */}
                <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
                  <Phone className="size-5 text-gray-900" />
                  <p className="text-sm font-medium text-gray-900">
                    +91-90443 20555
                  </p>
                </div>

                {/* Email 1 */}
                <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
                  <Mail className="size-5 text-gray-900" />
                  <p className="text-sm font-medium text-gray-900">
                    contact@shinermachinery.com
                  </p>
                </div>

                {/* Phone 2 */}
                <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
                  <Phone className="size-5 text-gray-900" />
                  <p className="text-sm font-medium text-gray-900">
                    +91-90443 20555
                  </p>
                </div>

                {/* Email 2 */}
                <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
                  <Mail className="size-5 text-gray-900" />
                  <p className="text-sm font-medium text-gray-900">
                    sales@shinermachinery.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-1 flex-col gap-7 rounded-3xl border border-gray-200 bg-gray-50 p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-gray-900"
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
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-900"
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
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contactNumber"
                  className="text-sm font-semibold text-gray-900"
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
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-900"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Placeholder"
                  rows={4}
                  required
                  className="min-h-[96px] rounded-2xl bg-secondary p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green px-5 py-4 shadow-[-3px_1px_24px_0px_rgba(0,0,0,0.15)] shadow-[inset_0px_-1px_4px_0px_rgba(255,255,255,0.4)] shadow-[inset_0px_2px_6px_0px_rgba(244,244,245,0.4)] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <span className="text-sm font-semibold text-gray-900">
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
      <section className="mx-auto max-w-[1200px] px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Corporate Office */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Corporate Office
              </h2>
              <p className="text-sm leading-5 text-gray-500">
                Office No.2, 1st Floor, Horizon Exotica, New D P RD, Haware
                City, Thane West, Thane, Maharashtra 400615, India
              </p>
            </div>
            <div className="aspect-square w-full rounded-3xl bg-gray-100" />
          </div>

          {/* Manufacturing Office */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Manufacturing Office
              </h2>
              <p className="text-sm leading-5 text-gray-500">
                Plot no. 5-6, Jajru Road, Near sector 59, Faridabad,
                Haryana-121004, India
              </p>
            </div>
            <div className="aspect-square w-full rounded-3xl bg-gray-100" />
          </div>

          {/* Branch Office */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Branch Office
              </h2>
              <p className="text-sm leading-5 text-gray-500">
                Palm enclave, Street no- 3, Near Heritage Lawn, Behind Sector
                04, Karnal, Haryana – 132001, India
              </p>
            </div>
            <div className="aspect-square w-full rounded-3xl bg-gray-100" />
          </div>
        </div>
      </section>
    </div>
  );
}
