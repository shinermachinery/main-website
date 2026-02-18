"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";

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
    <section className="max-w-7xl mx-auto px-6 py-24">
      <SectionHeading
        title="Frequently Asked Questions"
        description="Everything you need to know about our products and services."
      />
      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-10 w-full"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
