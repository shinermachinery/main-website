import {
  Award,
  Calendar,
  Eye,
  Info,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
}

export interface NavLinkWithIcon extends NavLink {
  icon: LucideIcon;
}

/**
 * Main navigation links displayed in navbar
 */
export const navLinks: NavLink[] = [
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Projects",
    href: "/projects",
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

/**
 * About Us dropdown navigation links
 */
export const aboutLinks: NavLinkWithIcon[] = [
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
  { name: "Mission & Vision", href: "/about/mission-vision" },
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
