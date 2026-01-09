"use client";

import { ArrowRight } from "lucide-react";
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
    <div className="bg-background">
      {/* Contact Form Section - Matching Figma Design */}
      <section className="mx-auto max-w-[1156px] px-6 py-16 md:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-10">
          {/* Left Column - Heading & CTA */}
          <div className="flex w-full flex-col gap-6 lg:w-[588px]">
            <h1 className="whitespace-pre-wrap font-['Plus_Jakarta_Sans'] text-[30px] font-medium leading-[40px] tracking-[-0.75px] text-primary">
              Get in touch for quotes, demos, or technical guidance.
            </h1>
            <button
              type="button"
              className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue-10 to-brand-green-10 px-4 py-2 shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.4)]"
            >
              <span
                className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-sm font-medium leading-5 text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90.59deg, var(--brand-blue) 15.881%, var(--brand-green) 115.02%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Contact Sales
              </span>
            </button>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-1 flex-col gap-7 rounded-3xl border border-border bg-background p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-primary"
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
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-primary"
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
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contactNumber"
                  className="font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-primary"
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
                  className="h-10 rounded-2xl bg-secondary px-3 py-2 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-primary"
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
                  className="min-h-24 rounded-2xl bg-secondary p-3 font-['Plus_Jakarta_Sans'] text-sm leading-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              {/* Submit Button - Matching Figma Gradient */}
              <button
                type="submit"
                disabled={isPending}
                className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green px-4 py-2 shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)] transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(88.66deg, var(--brand-blue) 27.509%, var(--brand-green) 115.04%)",
                }}
              >
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold leading-5 text-primary-foreground">
                  {isPending ? "Sending..." : "Send Message"}
                </span>
                <ArrowRight className="h-4 w-4 text-primary-foreground" />
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-center font-['Plus_Jakarta_Sans'] text-sm text-brand-green">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-center font-['Plus_Jakarta_Sans'] text-sm text-red-600">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="mx-auto max-w-[1156px] px-6 pb-16">
        <h2 className="mb-10 font-['Plus_Jakarta_Sans'] text-[30px] font-medium leading-[40px] tracking-[-0.75px] text-primary">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Corporate Office */}
          <div className="flex h-full flex-col gap-4">
            <div className="flex min-h-[120px] flex-col gap-2">
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-medium leading-7 tracking-[-0.0313rem] text-foreground">
                Corporate Office
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-sm leading-5 text-muted-foreground">
                Office No.2, 1st Floor, Horizon Exotica, New D P RD, Haware
                City, Thane West, Thane, Maharashtra 400615, India
              </p>
            </div>
            <div className="aspect-square w-full flex-shrink-0 overflow-hidden rounded-3xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.268489383847!2d72.96215607584634!3d19.21831548203891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9229e67d2e5%3A0x9e7c7f2b8c9a8b7c!2sHorizon%20Exotica%2C%20New%20D%20P%20Rd%2C%20Haware%20City%2C%20Thane%20West%2C%20Thane%2C%20Maharashtra%20400615!5e0!3m2!1sen!2sin!4v1704886800000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Corporate Office Location - Thane, Maharashtra"
              />
            </div>
          </div>

          {/* Manufacturing Office */}
          <div className="flex h-full flex-col gap-4">
            <div className="flex min-h-[120px] flex-col gap-2">
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-medium leading-7 tracking-[-0.0313rem] text-foreground">
                Manufacturing Office
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-sm leading-5 text-muted-foreground">
                Plot no. 5-6, Jajru Road, Near sector 59, Faridabad,
                Haryana-121004, India
              </p>
            </div>
            <div className="aspect-square w-full flex-shrink-0 overflow-hidden rounded-3xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5298423847!2d77.31561357585234!3d28.408901075788893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc2f2f2f2f2f%3A0x1a1a1a1a1a1a1a1a!2sJajru%20Road%2C%20Near%20Sector%2059%2C%20Faridabad%2C%20Haryana%20121004!5e0!3m2!1sen!2sin!4v1704886900000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Manufacturing Office Location - Faridabad, Haryana"
              />
            </div>
          </div>

          {/* Branch Office */}
          <div className="flex h-full flex-col gap-4">
            <div className="flex min-h-[120px] flex-col gap-2">
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-medium leading-7 tracking-[-0.0313rem] text-foreground">
                Branch Office
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-sm leading-5 text-muted-foreground">
                Palm enclave, Street no- 3, Near Heritage Lawn, Behind Sector
                04, Karnal, Haryana – 132001, India
              </p>
            </div>
            <div className="aspect-square w-full flex-shrink-0 overflow-hidden rounded-3xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9298423847!2d76.98247007585634!3d29.685701975788893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e65f5f5f5f5f5%3A0x2b2b2b2b2b2b2b2b!2sPalm%20Enclave%2C%20Street%20No%203%2C%20Near%20Heritage%20Lawn%2C%20Behind%20Sector%2004%2C%20Karnal%2C%20Haryana%20132001!5e0!3m2!1sen!2sin!4v1704887000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Branch Office Location - Karnal, Haryana"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
