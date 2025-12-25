import type { Metadata } from "next";
import { ContactPageClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us - Shiner Machinery",
  description:
    "Get in touch with our team for quotes, demos, or technical support. Contact Shiner Machinery for precision-engineered manufacturing solutions.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
