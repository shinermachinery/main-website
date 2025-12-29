"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";

const navLinks = [
  {
    name: "Products",
    href: "#products",
    hasDropdown: true,
  },
  {
    name: "Services",
    href: "/services",
    hasDropdown: false,
  },
  {
    name: "About Us",
    href: "/about",
    hasDropdown: false,
  },
  {
    name: "Other",
    href: "#",
    hasDropdown: true,
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {/* Logo Icon - Using gradient colors */}
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              {/* Logo Text */}
              <span className="text-xl font-bold text-zinc-900">SHINER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}

            <GradientButton size="default" className="ml-2">
              Get a Quote
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}

            <div className="px-4 pt-2">
              <GradientButton size="default" className="w-full">
                Get a Quote
              </GradientButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
