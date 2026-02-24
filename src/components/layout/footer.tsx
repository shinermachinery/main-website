import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-blur";

const socialLinks = [
  {
    href: siteConfig.social.twitter,
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: siteConfig.social.instagram,
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: siteConfig.social.facebook,
    label: "Facebook",
    icon: Facebook,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
          <Link href="/" className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {/* Logo Icon - Using linear colors */}
              <Image
                src={"/shiner-logo.png"}
                alt="Shiner Logo"
                width={48}
                height={48}
                className="size-8"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              {/* Logo Text */}
              <span className="text-xl font-bold text-brand-blue font-hyundai">SHINER</span>
            </div>
          </Link>

            <p className="text-sm text-muted-foreground">
              Precision engineering delivered with confidence. Built to perform,
              built to last.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Connect With Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-secondary border border-border text-primary flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="size-5" />
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.email}`}
                className="size-10 rounded-full bg-secondary border border-border text-primary flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a
                  href={`mailto:${siteConfig.salesEmail}`}
                  className="hover:text-foreground transition-colors"
                >
                  {siteConfig.salesEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
