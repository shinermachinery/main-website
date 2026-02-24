import {
  Award,
  Building2,
  Calendar,
  type LucideIcon,
  Mail,
  User,
  Users,
} from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
}

export interface NavLinkWithIcon extends NavLink {
  icon: LucideIcon;
}

/**
 * About dropdown links
 */
export const aboutLinks: NavLinkWithIcon[] = [
  {
    name: "About Us",
    href: "/about",
    icon: Building2,
  },
  {
    name: "Why Choose Us",
    href: "/about/why-choose-us",
    icon: Award,
  },
  {
    name: "About Director",
    href: "/about/director",
    icon: User,
  },
  {
    name: "Our Team",
    href: "/about/team",
    icon: Users,
  },
];

/**
 * Main navigation links displayed in navbar
 * Order: Our Products | Our Services | Our Projects | Events | Blogs
 * Note: "About" and "Our Products" are handled as popovers in the navbar
 */
export const navLinks: NavLink[] = [
  {
    name: "Our Services",
    href: "/services",
  },
  {
    name: "Our Projects",
    href: "/projects",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Blogs",
    href: "/blog",
  },
];

/**
 * More dropdown navigation links
 */
export const moreLinks: NavLinkWithIcon[] = [
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

/**
 * Footer quick links
 */
export const footerQuickLinks: NavLink[] = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

/**
 * Footer resource links
 */
export const footerResourceLinks: NavLink[] = [
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "/events" },
  { name: "Why Choose Us", href: "/about/why-choose-us" },
  { name: "Our Team", href: "/about/team" },
];

/**
 * Social media links
 */
export const socialLinks = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
} as const;
