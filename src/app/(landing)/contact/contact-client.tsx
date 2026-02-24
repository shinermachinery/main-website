"use client";

import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { siteConfig } from "@/lib/site-config";
import type { ContactPageData } from "@/sanity/lib/actions";

const { contactPage } = siteConfig;

interface ContactPageClientProps {
  data: ContactPageData;
}

export function ContactPageClient({ data }: ContactPageClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-12 flex flex-col gap-10">
      {/* Contact Form Section */}
     
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

          {/* Right Column - Shared Contact Form */}
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      

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
