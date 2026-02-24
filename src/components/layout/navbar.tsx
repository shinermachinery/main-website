"use client";
import { ChevronDown, Menu, Package, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import type { ProductCollection } from "@/lib/sanity-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { aboutLinks, moreLinks, navLinks } from "@/data/navigation";
import { GradientButton } from "../ui/gradient-button";

interface NavbarProps {
  collections?: ProductCollection[];
}

export function Navbar({ collections = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutPopoverOpen, setAboutPopoverOpen] = useState(false);
  const [productsPopoverOpen, setProductsPopoverOpen] = useState(false);
  const [morePopoverOpen, setMorePopoverOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Image
                src={"/shiner-logo.png"}
                alt="Shiner Logo"
                width={48}
                height={48}
                className="size-8"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <span className="text-xl font-bold text-brand-blue font-hyundai">SHINER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* About Popover */}
            <Popover open={aboutPopoverOpen} onOpenChange={setAboutPopoverOpen}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setAboutPopoverOpen(true)}
                onMouseLeave={() => setAboutPopoverOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors outline-hidden"
                >
                  About
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${aboutPopoverOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
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

            {/* Our Products Popover */}
            <Popover open={productsPopoverOpen} onOpenChange={setProductsPopoverOpen}>
              <PopoverTrigger
                asChild
                onMouseEnter={() => setProductsPopoverOpen(true)}
                onMouseLeave={() => setProductsPopoverOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors outline-hidden"
                >
                  Our Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${productsPopoverOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="bottom"
                sideOffset={8}
                className="p-2 w-64"
                onMouseEnter={() => setProductsPopoverOpen(true)}
                onMouseLeave={() => setProductsPopoverOpen(false)}
              >
                <div className="space-y-1">
                  <Link
                    href="/products"
                    onClick={() => setProductsPopoverOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-secondary-foreground rounded-lg hover:bg-brand-blue-10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center group-hover:from-brand-blue/20 group-hover:to-brand-green/20 transition-colors">
                      <Package className="w-4 h-4 text-brand-blue" />
                    </div>
                    <span>All Products</span>
                  </Link>
                  {collections.map((collection) => (
                    <Link
                      key={collection._id}
                      href={`/products?category=${collection.slug.current}`}
                      onClick={() => setProductsPopoverOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-secondary-foreground rounded-lg hover:bg-brand-blue-10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue/10 to-brand-green/10 flex items-center justify-center group-hover:from-brand-blue/20 group-hover:to-brand-green/20 transition-colors">
                        <Package className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span>{collection.title}</span>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Flat nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
              >
                {link.name}
              </Link>
            ))}

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

            <ModeToggle />

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
            {/* About section */}
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
              About
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

            {/* Products section */}
            <div className="pt-2 mt-2 border-t border-primary">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Our Products
              </div>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
              >
                All Products
              </Link>
              {collections.map((collection) => (
                <Link
                  key={collection._id}
                  href={`/products?category=${collection.slug.current}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
                >
                  {collection.title}
                </Link>
              ))}
            </div>

            {/* Flat nav links */}
            <div className="pt-2 mt-2 border-t border-primary">
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
            </div>

            {/* More section */}
            <div className="pt-2 mt-2 border-t border-primary">
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
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

            <div className="px-4 pt-2 space-y-2">
              <ModeToggle />
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
