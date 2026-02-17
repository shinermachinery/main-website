/**
 * Site Configuration
 *
 * Central configuration for site metadata, SEO, and branding.
 * Update these values to customize the site information.
 */

export const siteConfig = {
  // Site Identity
  name: "Shiner",
  shortName: "Shiner",
  description:
    "Premium quality products and services for your business needs. Trusted by clients worldwide.",
  tagline: "Quality You Can Trust",

  // URLs
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiner.com",
  ogImage: "/shinner-logo.png",

  // Contact
  email: "contact@shiner.com",
  phone: "+1 (555) 123-4567",

  // Social Media
  social: {
    twitter: "@shiner",
    facebook: "shiner",
    instagram: "shiner",
    linkedin: "company/shiner",
  },

  // SEO
  keywords: [
    "shiner",
    "quality products",
    "premium services",
    "business solutions",
    "trusted brand",
  ],

  // Contact Page
  contactPage: {
    heading: "Let's Build Better Production Together",
    subtitle:
      "Get in touch with our team for quotes, demos, or technical support.",
    getInTouchTitle: "Get In Touch",
    getInTouchDescription:
      "Whether you need a quote for new machinery, want to schedule a demo, or require technical support — our team is ready to help you find the right solution.",
  },

  // Theme
  themeColor: "#ffffff",
  backgroundColor: "#ffffff",

  // Localization
  locale: "en_US",
  language: "en",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Page Metadata Helper
 *
 * Creates consistent metadata for static pages.
 * Title values should NOT include " | Shiner" — the root layout template handles that.
 * OG/Twitter images and card type are inherited from the root layout.
 */
import type { Metadata } from "next";

const createPageMetadata = (
  title: string,
  description: string,
  keywords?: string[],
  path?: string,
): Metadata => ({
  title,
  description,
  ...(keywords && { keywords: [...siteConfig.keywords, ...keywords] }),
  ...(path && {
    alternates: { canonical: `${siteConfig.url}${path}` },
  }),
  openGraph: {
    title,
    description,
    ...(path && { url: `${siteConfig.url}${path}` }),
  },
  twitter: {
    title,
    description,
  },
});

export const pageMetadata = {
  home: {
    ...createPageMetadata(
      "Shiner - Precision Engineering Delivered With Confidence",
      "Precision-engineered components and solutions built to perform and built to last. Discover our featured products, meet our expert team, and experience 24/7 support with global reach.",
      [
        "precision engineering",
        "industrial components",
        "manufacturing",
        "engineering solutions",
        "high precision",
        "quality components",
      ],
      "/",
    ),
    // Use absolute title to prevent template from appending " | Shiner"
    title: {
      absolute: "Shiner - Precision Engineering Delivered With Confidence",
    },
  },
  about: createPageMetadata(
    "About Us",
    "Shiner Machinery designs and delivers precision-engineered machines that empower manufacturers to build faster, smarter, and more efficiently.",
    ["about", "company", "precision machinery"],
    "/about",
  ),
  aboutDirector: createPageMetadata(
    "About Our Director",
    "Meet the leadership behind Shiner. Learn about our director's vision, expertise, and commitment to excellence.",
    ["director", "leadership"],
    "/about/director",
  ),
  aboutMissionVision: createPageMetadata(
    "Our Mission & Vision",
    "Learn about Shiner's mission to deliver excellence and our vision for the future of food processing technology.",
    ["mission", "vision"],
    "/about/mission-vision",
  ),
  aboutWhyChooseUs: createPageMetadata(
    "Why Choose Us",
    "Discover why leading companies choose Shiner for their food processing equipment needs. Quality, reliability, and exceptional service.",
    ["why choose us", "quality", "reliability"],
    "/about/why-choose-us",
  ),
  blog: createPageMetadata(
    "Blog",
    "Insights, updates, and stories from the world of precision engineering and industrial machinery.",
    ["blog", "engineering insights"],
    "/blog",
  ),
  contact: createPageMetadata(
    "Contact Us",
    "Get in touch with our team for quotes, demos, or technical support. Contact Shiner Machinery for precision-engineered manufacturing solutions.",
    ["contact", "support", "quotes"],
    "/contact",
  ),
  events: createPageMetadata(
    "Events",
    "Explore our events, certifications, and achievements. See what we've accomplished and the recognition we've received.",
    ["events", "certifications", "achievements"],
    "/events",
  ),
  products: createPageMetadata(
    "Our Products",
    "Explore our comprehensive range of products and projects. High-quality machinery and equipment for food processing plants.",
    ["products", "machinery", "equipment"],
    "/products",
  ),
  projects: createPageMetadata(
    "Our Projects",
    "Explore our installations, flow charts, and client projects. Precision engineering solutions for food processing plants.",
    ["projects", "installations", "clients"],
    "/projects",
  ),
  services: createPageMetadata(
    "Our Services",
    "Explore our comprehensive services including training, spare parts, after-sale service, equipment modernization, and consultancy services.",
    ["services", "training", "spare parts", "consultancy"],
    "/services",
  ),
  notFound: createPageMetadata(
    "Page Not Found",
    "The page you're looking for doesn't exist or has been moved.",
  ),
};
