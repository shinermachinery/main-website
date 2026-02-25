export interface NavLink {
  name: string;
  href: string;
}

// ============================================================================
// Link Groups
// ============================================================================

export const aboutLinks: NavLink[] = [
  { name: "About Us", href: "/about" },
  { name: "Why Choose Us", href: "/about/why-choose-us" },
  { name: "About Director", href: "/about/director" },
  { name: "Our Team", href: "/about/team" },
];

export const projectLinks: NavLink[] = [
  { name: "Our Projects", href: "/projects" },
  { name: "Our Client List", href: "/projects#client-list" },
  { name: "Testimonials", href: "/testimonials" },
];

export const navLinks: NavLink[] = [
  { name: "Our Services", href: "/services" },
];

export const moreLinks: NavLink[] = [
  { name: "Events", href: "/events" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// ============================================================================
// Desktop Navigation
// ============================================================================

export type DesktopNavItem =
  | { type: "popover"; label: string; links: NavLink[]; align: "start" | "end" }
  | { type: "products"; label: string; align: "start" | "end" }
  | { type: "links" };

export const desktopNavItems: DesktopNavItem[] = [
  { type: "popover", label: "About", links: aboutLinks, align: "start" },
  { type: "products", label: "Our Products", align: "start" },
  { type: "popover", label: "Projects", links: projectLinks, align: "start" },
  { type: "links" },
  { type: "popover", label: "More", links: moreLinks, align: "end" },
];

// ============================================================================
// Mobile Navigation
// ============================================================================

export interface MobileNavSection {
  title?: string;
  links: NavLink[];
}

export const mobileNavSections: MobileNavSection[] = [
  { title: "About", links: aboutLinks },
  // Products section inserted dynamically between index 0 and 1 in navbar
  { title: "Projects", links: projectLinks },
  { links: navLinks },
  { title: "More", links: moreLinks },
];

// ============================================================================
// CTA
// ============================================================================

export const navbarCta = {
  text: "Get a Quote",
  href: "/contact",
} as const;

// ============================================================================
// Footer
// ============================================================================

export const footerQuickLinks: NavLink[] = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const footerResourceLinks: NavLink[] = [
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "/events" },
  { name: "Why Choose Us", href: "/about/why-choose-us" },
  { name: "Our Team", href: "/about/team" },
];

export const socialLinks = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
} as const;
