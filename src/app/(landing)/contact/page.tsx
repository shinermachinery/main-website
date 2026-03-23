import { pageMetadata } from "@/lib/site-config";
import { getContactPage } from "@/sanity/lib/actions";
import { ContactPageClient } from "./contact-client";

export const metadata = pageMetadata.contact;

export default async function ContactPage() {
  const contactData = await getContactPage();

  return <ContactPageClient data={contactData} />;
}
