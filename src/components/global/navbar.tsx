"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GradientButton } from "../ui/gradient-button";
import { navLinks, aboutLinks, moreLinks } from "@/data/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutPopoverOpen, setAboutPopoverOpen] = useState(false);
  const [morePopoverOpen, setMorePopoverOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {/* Logo Icon - Using linear colors */}
              <div className="w-7 h-7 rounded-md bg-linear-to-br from-brand-blue to-brand-green flex items-center justify-center">
                <div className="w-4 h-4 bg-secondary rounded-sm" />
              </div>
              {/* Logo Text */}
              <span className="text-xl font-bold text-brand-blue ">SHINER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors outline-hidden"
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
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-secondary-foreground rounded-lg hover:bg-brand-blue-10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center group-hover:from-brand-blue/20 group-hover:to-brand-green/20 transition-colors">
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors outline-hidden"
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
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-secondary-foreground rounded-lg hover:bg-brand-blue-10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center group-hover:from-brand-blue/20 group-hover:to-brand-green/20 transition-colors">
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
              <Link href="/contact">Get a Quote</Link>
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary-foreground hover:bg-brand-blue-10 rounded-lg transition-colors"
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
          <div className="lg:hidden border-t border-primary py-4 space-y-2">
            {/* Main nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* About Us section - expanded for mobile */}
            <div className="pt-2 mt-2 border-t border-primary">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                About Us
              </div>
              {aboutLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* More section - expanded for mobile */}
            <div className="pt-2 mt-2 border-t border-primary">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                More
              </div>
              {moreLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="px-4 pt-2">
              <GradientButton size="default" className="w-full">
                <Link href="/contact">Get a Quote</Link>
              </GradientButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
