"use client";

import {
  Award,
  Calendar,
  ChevronDown,
  Eye,
  Info,
  Mail,
  Menu,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  {
    name: "Products",
    href: "/projects",
  },
  {
    name: "Projects",
    href: "/products",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

const aboutLinks = [
  {
    name: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    name: "Why Choose Us",
    href: "/about/why-choose-us",
    icon: Award,
  },
  {
    name: "Mission & Vision",
    href: "/about/mission-vision",
    icon: Eye,
  },
  {
    name: "About Director",
    href: "/about/director",
    icon: User,
  },
];

const moreLinks = [
  {
    name: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutPopoverOpen, setAboutPopoverOpen] = useState(false);
  const [morePopoverOpen, setMorePopoverOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
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
                className="px-4 py-2 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* About Us Popover with Hover */}
            <Popover open={aboutPopoverOpen} onOpenChange={setAboutPopoverOpen}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setAboutPopoverOpen(true)}
                onMouseLeave={() => setAboutPopoverOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors outline-hidden"
                >
                  About Us
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${aboutPopoverOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                sideOffset={8}
                className="p-2 w-64"
                onMouseEnter={() => setAboutPopoverOpen(true)}
                onMouseLeave={() => setAboutPopoverOpen(false)}
              >
                <div className="space-y-1">
                  {aboutLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setAboutPopoverOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center group-hover:from-brand-blue/20 group-hover:to-brand-green/20 transition-colors">
                          <Icon className="w-4 h-4 text-brand-blue" />
                        </div>
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

            {/* More Popover with Hover */}
            <Popover open={morePopoverOpen} onOpenChange={setMorePopoverOpen}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setMorePopoverOpen(true)}
                onMouseLeave={() => setMorePopoverOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors outline-hidden"
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${morePopoverOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                sideOffset={8}
                className="p-2 w-64"
                onMouseEnter={() => setMorePopoverOpen(true)}
                onMouseLeave={() => setMorePopoverOpen(false)}
              >
                <div className="space-y-1">
                  {moreLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMorePopoverOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center group-hover:from-brand-blue/20 group-hover:to-brand-green/20 transition-colors">
                          <Icon className="w-4 h-4 text-brand-blue" />
                        </div>
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

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
            {/* Main nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* About Us section - expanded for mobile */}
            <div className="pt-2 mt-2 border-t border-zinc-200">
              <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                About Us
              </div>
              {aboutLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* More section - expanded for mobile */}
            <div className="pt-2 mt-2 border-t border-zinc-200">
              <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                More
              </div>
              {moreLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

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
