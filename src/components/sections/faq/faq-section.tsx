"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quality Parameters",
    answer:
      "We supply all the lab equipments and machineries with no compromise in quality and using the best Japanese technology.",
  },
  {
    question: "Our Vision",
    answer:
      "We are driven by Customer Oriented approach to providing World Class, Innovative, and Competitive color sorting machinery and other lab equipments for the food grain industry. We aim to provide the best technology and technique to ease the working and functioning in the food grain industry.",
  },
  {
    question: "Year of Experience",
    answer:
      "We have more than 10 years of experience in designing, manufacturing and sale of color sorter, grain equipments and other machineries.",
  },
  {
    question: "Service Assurance",
    answer:
      "We provide support on call, email and trained engineers available onsite support anytime and in any countries.",
  },
  {
    question: "Life Time Support",
    answer:
      "More than 50+ engineers are ready to help you on site and provide lifetime guarantee.",
  },
];

export function FaqSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left column — Heading */}
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold text-brand-blue uppercase">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about our products and services.
          </p>
        </div>

        {/* Right column — Accordion */}
        <div className="lg:col-span-3">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none bg-secondary rounded-xl px-5"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
