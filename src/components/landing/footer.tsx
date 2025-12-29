import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f9f9fb] border-t border-[#e5e5e5]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Shiner
            </h3>
            <p
              className="text-sm text-[#71717a]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Precision engineering delivered with confidence. Built to perform,
              built to last.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="font-semibold text-[#18181b]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4
              className="font-semibold text-[#18181b]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/studio"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Content Studio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#71717a] hover:text-[#18181b] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4
              className="font-semibold text-[#18181b]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Connect With Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white border border-[#e5e5e5] text-[#18181b] flex items-center justify-center hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] transition-all"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white border border-[#e5e5e5] text-[#18181b] flex items-center justify-center hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white border border-[#e5e5e5] text-[#18181b] flex items-center justify-center hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="h-10 w-10 rounded-full bg-white border border-[#e5e5e5] text-[#18181b] flex items-center justify-center hover:bg-[#18B75A] hover:text-white hover:border-[#18B75A] transition-all"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p
              className="text-sm text-[#71717a]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              <a
                href="mailto:contact@example.com"
                className="hover:text-[#18181b] transition-colors"
              >
                contact@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e5e5e5]">
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            <p>© {currentYear} Shiner. All rights reserved.</p>
            <p className="text-center">
              Built with <span className="text-red-500">❤</span> using Next.js
              and Sanity CMS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
