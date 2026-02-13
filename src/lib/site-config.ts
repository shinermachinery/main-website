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

  // Theme
  themeColor: "#ffffff",
  backgroundColor: "#ffffff",

  // Localization
  locale: "en_US",
  language: "en",
} as const;

export type SiteConfig = typeof siteConfig;
