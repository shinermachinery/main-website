import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="w-full" aria-labelledby="contact-heading">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-1 flex flex-col gap-6">
          <h2
            id="contact-heading"
            className="font-medium text-2xl text-primary text-center sm:text-left"
          >
            Get in touch for quotes, demos, or technical guidance.
          </h2>
          <Button
            className="sm:w-fit rounded-full cursor-pointer w-full"
            variant="shiner"
            size="lg"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>

        <div className="flex-1 w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
