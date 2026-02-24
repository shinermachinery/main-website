"use client";
import { ChevronDown, Menu, X } from "lucide-react";
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
import {
  desktopNavItems,
  mobileNavSections,
  navLinks,
  navbarCta,
} from "@/data/navigation";
import { Button } from "../ui/button";

interface NavbarProps {
  collections?: ProductCollection[];
}

export function Navbar({ collections = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-start gap-1">
            <div className="flex items-center gap-1">
              <Image
                src="/shiner-logo.png"
                alt="Shiner Logo"
                width={48}
                height={48}
                className="size-8"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <span className="text-xl font-bold text-brand-blue font-hyundai">
                SHINER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {desktopNavItems.map((item) => {
              if (item.type === "links") {
                return navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors"
                  >
                    {link.name}
                  </Link>
                ));
              }

              // Popover items (both static links and products)
              const popoverId = item.label;
              const isOpen = openPopover === popoverId;

              const popoverLinks =
                item.type === "products"
                  ? [
                      { name: "All Products", href: "/products" },
                      ...collections.map((c) => ({
                        name: c.title,
                        href: `/products?category=${c.slug.current}`,
                      })),
                    ]
                  : item.links;

              return (
                <Popover
                  key={popoverId}
                  open={isOpen}
                  onOpenChange={(open) =>
                    setOpenPopover(open ? popoverId : null)
                  }
                >
                  <PopoverTrigger
                    asChild
                    onMouseEnter={() => setOpenPopover(popoverId)}
                    onMouseLeave={() => setOpenPopover(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-secondary-foreground rounded-xl hover:bg-brand-blue-10 transition-colors outline-hidden"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align={item.align}
                    side="bottom"
                    sideOffset={8}
                    className="p-2 w-48"
                    onMouseEnter={() => setOpenPopover(popoverId)}
                    onMouseLeave={() => setOpenPopover(null)}
                  >
                    <div className="space-y-1">
                      {popoverLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setOpenPopover(null)}
                          className="block px-3 py-2.5 text-sm font-medium text-secondary-foreground rounded-lg hover:bg-brand-blue-10 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            })}

            <ModeToggle />

            <Button variant="shiner" className="ml-2" asChild>
              <Link href={navbarCta.href}>{navbarCta.text}</Link>
            </Button>
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
          <div className="lg:hidden border-t border-primary py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {mobileNavSections.map((section, i) => (
              <div key={section.title || `section-${i}`}>
                <div
                  className={
                    i > 0 ? "pt-2 mt-2 border-t border-primary" : ""
                  }
                >
                  {section.title && (
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                      {section.title}
                    </div>
                  )}
                  {section.links.map((link) => (
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

                {/* Insert Products section after About */}
                {i === 0 && (
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
                )}
              </div>
            ))}

            <div>
              <ModeToggle />
              <Button variant="shiner" className="w-full" asChild>
                <Link href={navbarCta.href}>{navbarCta.text}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
