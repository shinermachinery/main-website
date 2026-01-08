# Constants Architecture Guide

**Purpose:** Eliminate hard-coded values and create a single source of truth for all application constants.

**Priority:** 🔴 Critical - Must be implemented first before other refactoring.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Implementation Files](#implementation-files)
4. [Migration Strategy](#migration-strategy)
5. [Usage Guidelines](#usage-guidelines)
6. [Testing](#testing)

---

## Overview

### Current Problem

Hard-coded values scattered across 100+ files:
- Colors: `#18181b`, `#71717a` appear 110+ times
- URLs: `contact@example.com`, social links repeated 20+ times
- Navigation: Links defined in 3 different places
- Company info: Contact details spread across multiple files

### Solution

Create `/src/constants` directory with organized, typed constant files that serve as the single source of truth.

---

## Directory Structure

```
src/constants/
├── index.ts                 # Re-exports everything for easy imports
├── design-tokens.ts         # Colors, typography, spacing (from design system)
├── navigation.ts            # Nav links, routes, breadcrumbs
├── company.ts               # Contact info, social links, address
├── routes.ts                # All application routes
├── config.ts                # Feature flags, pagination, app settings
├── forms.ts                 # Form validation rules, error messages
└── seo.ts                   # Default SEO metadata
```

---

## Implementation Files

### 1. index.ts

Central export point for all constants.

```typescript
/**
 * Constants Index
 * Re-exports all application constants for convenient importing
 *
 * Usage:
 * import { companyInfo, mainNavLinks, appConfig } from '@/constants';
 */

export * from './design-tokens';
export * from './navigation';
export * from './company';
export * from './routes';
export * from './config';
export * from './forms';
export * from './seo';

// Named exports for commonly used constants
export { designTokens } from './design-tokens';
export { companyInfo } from './company';
export { appConfig } from './config';
export { mainNavLinks, aboutLinks, moreLinks } from './navigation';
export { routes } from './routes';
```

---

### 2. design-tokens.ts

Complete design system tokens (see design-system.md for full implementation).

```typescript
/**
 * Design Tokens
 * Single source of truth for all design decisions
 * Colors, typography, spacing, shadows, etc.
 */

export const designTokens = {
  colors: {
    brand: {
      blue: 'oklch(0.45 0.12 250)',
      green: 'oklch(0.65 0.18 150)',
      blueSubtle: 'oklch(0.45 0.12 250 / 10%)',
      greenSubtle: 'oklch(0.65 0.18 150 / 10%)',
    },
    text: {
      primary: '#18181b',
      secondary: '#71717a',
      tertiary: '#a1a1aa',
      inverse: '#fafafa',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9f9fb',
      tertiary: '#f4f4f5',
      card: '#ffffff',
    },
    border: {
      default: '#e4e4e7',
      subtle: '#f4f4f5',
      focus: '#0D9488',
      error: '#ef4444',
    },
    status: {
      success: '#18B75A',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-plus-jakarta-sans), system-ui, -apple-system, sans-serif',
      mono: 'var(--font-geist-mono), Menlo, Monaco, monospace',
    },
    // ... rest from design-system.md
  },

  // spacing, shadows, borderRadius, transitions, breakpoints, zIndex
  // (Full implementation in design-system.md)
} as const;

export type DesignTokens = typeof designTokens;
```

---

### 3. navigation.ts

All navigation links and menu structures.

```typescript
/**
 * Navigation Constants
 * All navigation links, menu structures, and routing info
 */

import type { LucideIcon } from "lucide-react";
import {
  Info, Award, Eye, User,
  Calendar, Mail, Package, Briefcase,
  FileText, Wrench
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export interface NavLink {
  name: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

// ============================================================================
// Main Navigation
// ============================================================================

export const mainNavLinks: NavLink[] = [
  {
    name: "Products",
    href: "/products",
    description: "Explore our precision-engineered products",
  },
  {
    name: "Projects",
    href: "/projects",
    description: "View our successful installations",
  },
  {
    name: "Services",
    href: "/services",
    description: "Professional services and support",
  },
  {
    name: "Blog",
    href: "/blog",
    description: "Industry insights and news",
  },
];

// ============================================================================
// About Us Dropdown
// ============================================================================

export const aboutLinks: NavLink[] = [
  {
    name: "About Us",
    href: "/about",
    icon: Info,
    description: "Learn about our company and mission",
  },
  {
    name: "Why Choose Us",
    href: "/about/why-choose-us",
    icon: Award,
    description: "Our competitive advantages",
  },
  {
    name: "Mission & Vision",
    href: "/about/mission-vision",
    icon: Eye,
    description: "Our goals and values",
  },
  {
    name: "About Director",
    href: "/about/director",
    icon: User,
    description: "Leadership and experience",
  },
];

// ============================================================================
// More Dropdown
// ============================================================================

export const moreLinks: NavLink[] = [
  {
    name: "Events",
    href: "/events",
    icon: Calendar,
    description: "Upcoming events and exhibitions",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
    description: "Get in touch with our team",
  },
];

// ============================================================================
// Footer Navigation
// ============================================================================

export const footerSections: NavSection[] = [
  {
    title: "Quick Links",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Products", href: "/products" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Browse All", href: "/products" },
      { name: "Featured Products", href: "/products?featured=true" },
      { name: "New Arrivals", href: "/products?sort=newest" },
      { name: "Product Collections", href: "/products/collections" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Events", href: "/events" },
      { name: "Content Studio", href: "/studio" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

// ============================================================================
// Breadcrumb Paths
// ============================================================================

export const breadcrumbLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About Us",
  "/about/why-choose-us": "Why Choose Us",
  "/about/mission-vision": "Mission & Vision",
  "/about/director": "About Director",
  "/products": "Products",
  "/products/[slug]": "Product Details",
  "/projects": "Projects",
  "/services": "Services",
  "/blog": "Blog",
  "/blog/[slug]": "Article",
  "/events": "Events",
  "/contact": "Contact",
  "/studio": "Content Studio",
};

// ============================================================================
// Mobile Menu Configuration
// ============================================================================

export const mobileMenuConfig = {
  showSearch: false,
  showCTA: true,
  ctaText: "Get a Quote",
  ctaHref: "/contact",
  groupSections: true, // Whether to visually group "About" and "More" sections
};

// ============================================================================
// CTA Configuration
// ============================================================================

export const ctaButton = {
  text: "Get a Quote",
  href: "/contact",
  showInNavbar: true,
  showInMobile: true,
  variant: "gradient" as const,
};
```

---

### 4. company.ts

Company information, contact details, social links.

```typescript
/**
 * Company Information Constants
 * Contact details, social media, physical locations, legal info
 */

import type { LucideIcon } from "lucide-react";
import {
  Mail, Phone, MapPin,
  Github, Twitter, Linkedin, Facebook, Instagram, Youtube
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export interface ContactInfo {
  type: "email" | "phone" | "address";
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  handle?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  formatted: string;
  mapUrl?: string;
}

// ============================================================================
// Company Info
// ============================================================================

export const companyInfo = {
  name: "Shiner",
  legalName: "Shiner Machinery Inc.",
  tagline: "Precision Engineering Delivered With Confidence",
  description: "Precision-engineered components and solutions built to perform and built to last.",

  foundedYear: 2010,

  // Short description for meta tags
  shortDescription: "Industrial machinery manufacturer specializing in precision-engineered solutions.",
} as const;

// ============================================================================
// Contact Information
// ============================================================================

export const contactInfo: ContactInfo[] = [
  {
    type: "email",
    label: "Email",
    value: "contact@shiner.example.com",
    href: "mailto:contact@shiner.example.com",
    icon: Mail,
  },
  {
    type: "email",
    label: "Support Email",
    value: "support@shiner.example.com",
    href: "mailto:support@shiner.example.com",
    icon: Mail,
  },
  {
    type: "phone",
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    icon: Phone,
  },
  {
    type: "phone",
    label: "Toll Free",
    value: "1-800-SHINER-1",
    href: "tel:18007446371",
    icon: Phone,
  },
];

// Quick access to primary contact
export const primaryEmail = "contact@shiner.example.com";
export const primaryPhone = "+1 (555) 123-4567";
export const supportEmail = "support@shiner.example.com";

// ============================================================================
// Physical Addresses
// ============================================================================

export const addresses: Record<"headquarters" | "warehouse" | "showroom", Address> = {
  headquarters: {
    street: "123 Industrial Avenue",
    city: "Manufacturing City",
    state: "MC",
    zip: "12345",
    country: "United States",
    formatted: "123 Industrial Avenue, Manufacturing City, MC 12345, USA",
    mapUrl: "https://maps.google.com/?q=123+Industrial+Avenue+Manufacturing+City+MC",
  },
  warehouse: {
    street: "456 Distribution Blvd",
    city: "Logistics Town",
    state: "LT",
    zip: "67890",
    country: "United States",
    formatted: "456 Distribution Blvd, Logistics Town, LT 67890, USA",
    mapUrl: "https://maps.google.com/?q=456+Distribution+Blvd+Logistics+Town+LT",
  },
  showroom: {
    street: "789 Display Street",
    city: "Demo City",
    state: "DC",
    zip: "11111",
    country: "United States",
    formatted: "789 Display Street, Demo City, DC 11111, USA",
    mapUrl: "https://maps.google.com/?q=789+Display+Street+Demo+City+DC",
  },
};

// ============================================================================
// Social Media Links
// ============================================================================

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/shiner",
    icon: Github,
    handle: "@shiner",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/shiner",
    icon: Twitter,
    handle: "@shiner",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/shiner",
    icon: Linkedin,
    handle: "Shiner Machinery",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/shiner",
    icon: Facebook,
    handle: "Shiner",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/shiner",
    icon: Instagram,
    handle: "@shiner",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@shiner",
    icon: Youtube,
    handle: "@shiner",
  },
];

// Quick access to specific platforms
export const socialUrls = {
  github: "https://github.com/shiner",
  twitter: "https://twitter.com/shiner",
  linkedin: "https://linkedin.com/company/shiner",
  facebook: "https://facebook.com/shiner",
  instagram: "https://instagram.com/shiner",
  youtube: "https://youtube.com/@shiner",
} as const;

// ============================================================================
// Business Hours
// ============================================================================

export const businessHours = {
  timezone: "America/New_York",
  weekdays: {
    open: "08:00",
    close: "18:00",
    formatted: "8:00 AM - 6:00 PM EST",
  },
  saturday: {
    open: "09:00",
    close: "14:00",
    formatted: "9:00 AM - 2:00 PM EST",
  },
  sunday: {
    open: null,
    close: null,
    formatted: "Closed",
  },
  supportAvailable: "24/7 emergency support available",
} as const;

// ============================================================================
// Legal Information
// ============================================================================

export const legalInfo = {
  privacyPolicyUrl: "/privacy",
  termsOfServiceUrl: "/terms",
  cookiePolicyUrl: "/cookies",
  gdprCompliant: true,
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: "Shiner Machinery Inc.",
  taxId: "12-3456789", // Only if needed for invoices
  businessRegistration: "REG-123456",
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get formatted copyright text
 */
export function getCopyrightText(): string {
  return `© ${legalInfo.copyrightYear} ${legalInfo.copyrightHolder}. All rights reserved.`;
}

/**
 * Get primary contact email with mailto: link
 */
export function getPrimaryEmailLink(): string {
  return `mailto:${primaryEmail}`;
}

/**
 * Get formatted phone number for tel: links
 */
export function getPhoneLink(phone: string = primaryPhone): string {
  return `tel:${phone.replace(/\D/g, '')}`;
}

/**
 * Get social link by platform name
 */
export function getSocialLink(platform: keyof typeof socialUrls): string {
  return socialUrls[platform];
}
```

---

### 5. routes.ts

Application route paths with type safety.

```typescript
/**
 * Application Routes
 * Type-safe route definitions with helper functions
 */

// ============================================================================
// Static Routes
// ============================================================================

export const routes = {
  home: "/",

  // About pages
  about: "/about",
  aboutWhyChooseUs: "/about/why-choose-us",
  aboutMissionVision: "/about/mission-vision",
  aboutDirector: "/about/director",

  // Products
  products: "/products",
  productDetail: (slug: string) => `/products/${slug}`,
  productCollections: "/products/collections",

  // Projects
  projects: "/projects",

  // Services
  services: "/services",

  // Blog
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,

  // Events
  events: "/events",

  // Contact
  contact: "/contact",

  // CMS
  studio: "/studio",

  // Legal
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",

  // Other
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
} as const;

// ============================================================================
// Route Groups
// ============================================================================

export const routeGroups = {
  about: [
    routes.about,
    routes.aboutWhyChooseUs,
    routes.aboutMissionVision,
    routes.aboutDirector,
  ],

  content: [
    routes.blog,
    routes.events,
    routes.products,
    routes.projects,
    routes.services,
  ],

  legal: [
    routes.privacy,
    routes.terms,
    routes.cookies,
  ],
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if current path matches a route
 */
export function isActiveRoute(currentPath: string, routePath: string): boolean {
  if (routePath === routes.home) {
    return currentPath === routePath;
  }
  return currentPath.startsWith(routePath);
}

/**
 * Get route group for a path
 */
export function getRouteGroup(path: string): keyof typeof routeGroups | null {
  for (const [group, paths] of Object.entries(routeGroups)) {
    if (paths.some(p => path.startsWith(p))) {
      return group as keyof typeof routeGroups;
    }
  }
  return null;
}

/**
 * Build product detail URL
 */
export function getProductUrl(slug: string): string {
  return routes.productDetail(slug);
}

/**
 * Build blog post URL
 */
export function getBlogPostUrl(slug: string): string {
  return routes.blogPost(slug);
}
```

---

### 6. config.ts

Application configuration and feature flags.

```typescript
/**
 * Application Configuration
 * App settings, feature flags, pagination, etc.
 */

// ============================================================================
// Site Configuration
// ============================================================================

export const siteConfig = {
  name: "Shiner",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiner.example.com",
  ogImage: "/og-image.jpg",
  twitterHandle: "@shiner",

  // Default locale
  locale: "en-US",
  defaultLocale: "en",
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const features = {
  // Content features
  enableBlog: true,
  enableEvents: true,
  enableNewsletter: false,
  enableSearch: true,
  enableComments: false,

  // E-commerce features
  enableCart: false,
  enableCheckout: false,
  enableWishlist: false,

  // Interaction features
  enableLiveChat: false,
  enableCookieConsent: true,
  enableAnalytics: true,

  // Admin features
  enableStudio: true,
  enablePreview: true,
} as const;

// ============================================================================
// Pagination
// ============================================================================

export const pagination = {
  blog: {
    postsPerPage: 9,
    showPagination: true,
    showLoadMore: false,
  },
  products: {
    itemsPerPage: 12,
    showPagination: true,
    showLoadMore: false,
  },
  events: {
    itemsPerPage: 6,
    showPagination: true,
    showLoadMore: true,
  },
  search: {
    resultsPerPage: 20,
    showPagination: true,
  },
} as const;

// ============================================================================
// External Services
// ============================================================================

export const services = {
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    enabled: features.enableAnalytics && !!process.env.NEXT_PUBLIC_GA_ID,
  },

  monitoring: {
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  maps: {
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    enabled: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  },
} as const;

// ============================================================================
// Content Configuration
// ============================================================================

export const content = {
  // Blog
  blog: {
    showAuthor: true,
    showCategories: true,
    showReadTime: true,
    showShareButtons: true,
    showRelatedPosts: true,
    relatedPostsCount: 3,
  },

  // Products
  products: {
    showPrice: true,
    showFeatures: true,
    showRelated: true,
    relatedProductsCount: 4,
    enableFiltering: true,
    enableSorting: true,
  },

  // Images
  images: {
    quality: 85,
    formats: ['webp', 'jpg'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
} as const;

// ============================================================================
// Form Configuration
// ============================================================================

export const forms = {
  contact: {
    enableCaptcha: false,
    maxMessageLength: 1000,
    allowedFileTypes: ['.pdf', '.doc', '.docx'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
} as const;

// ============================================================================
// Timeouts & Limits
// ============================================================================

export const limits = {
  apiTimeout: 10000, // 10 seconds
  searchDebounce: 300, // 300ms
  toastDuration: 5000, // 5 seconds
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature];
}

/**
 * Get pagination config for a content type
 */
export function getPaginationConfig(type: keyof typeof pagination) {
  return pagination[type];
}

/**
 * Check if external service is enabled
 */
export function isServiceEnabled(service: keyof typeof services): boolean {
  return services[service].enabled;
}
```

---

### 7. forms.ts

Form validation rules and error messages.

```typescript
/**
 * Form Constants
 * Validation rules, error messages, placeholders
 */

// ============================================================================
// Validation Rules
// ============================================================================

export const validation = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    required: true,
  },

  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
    required: true,
  },

  phone: {
    pattern: /^[\d\s()+-]+$/,
    minLength: 10,
    maxLength: 20,
    required: false,
  },

  message: {
    minLength: 10,
    maxLength: 1000,
    required: true,
  },

  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: false,
  },
} as const;

// ============================================================================
// Error Messages
// ============================================================================

export const errorMessages = {
  // Required fields
  required: "This field is required",
  requiredField: (field: string) => `${field} is required`,

  // Name validation
  nameMinLength: `Name must be at least ${validation.name.minLength} characters`,
  nameMaxLength: `Name cannot exceed ${validation.name.maxLength} characters`,
  nameInvalid: "Please enter a valid name (letters, spaces, hyphens, and apostrophes only)",

  // Email validation
  emailInvalid: "Please enter a valid email address",
  emailMaxLength: `Email cannot exceed ${validation.email.maxLength} characters`,

  // Phone validation
  phoneInvalid: "Please enter a valid phone number",
  phoneMinLength: `Phone number must be at least ${validation.phone.minLength} digits`,
  phoneMaxLength: `Phone number cannot exceed ${validation.phone.maxLength} characters`,

  // Message validation
  messageMinLength: `Message must be at least ${validation.message.minLength} characters`,
  messageMaxLength: `Message cannot exceed ${validation.message.maxLength} characters`,

  // Password validation
  passwordMinLength: `Password must be at least ${validation.password.minLength} characters`,
  passwordUppercase: "Password must contain at least one uppercase letter",
  passwordLowercase: "Password must contain at least one lowercase letter",
  passwordNumber: "Password must contain at least one number",
  passwordSpecialChar: "Password must contain at least one special character",

  // Generic
  invalidFormat: "Invalid format",
  serverError: "Something went wrong. Please try again later.",
  networkError: "Network error. Please check your connection.",
  rateLimitExceeded: "Too many requests. Please try again later.",
} as const;

// ============================================================================
// Success Messages
// ============================================================================

export const successMessages = {
  contactForm: "Thank you for your message! We'll get back to you soon.",
  newsletterSubscribe: "Successfully subscribed to our newsletter!",
  formSubmitted: "Form submitted successfully!",
  changesSaved: "Changes saved successfully!",
} as const;

// ============================================================================
// Placeholders
// ============================================================================

export const placeholders = {
  name: "Enter your full name",
  email: "Enter your email address",
  phone: "Enter your phone number",
  message: "Enter your message",
  search: "Search...",
  password: "Enter your password",
  confirmPassword: "Confirm your password",
  subject: "Enter subject",
  company: "Enter company name",
  optional: " (optional)",
} as const;

// ============================================================================
// Labels
// ============================================================================

export const labels = {
  name: "Full Name",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  contactNumber: "Contact Number",
  message: "Message",
  subject: "Subject",
  company: "Company Name",
  password: "Password",
  confirmPassword: "Confirm Password",
  rememberMe: "Remember me",
  agreeToTerms: "I agree to the terms and conditions",
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return validation.email.pattern.test(email);
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  return validation.phone.pattern.test(phone) &&
         phone.replace(/\D/g, '').length >= validation.phone.minLength;
}

/**
 * Validate name format
 */
export function isValidName(name: string): boolean {
  return validation.name.pattern.test(name) &&
         name.length >= validation.name.minLength &&
         name.length <= validation.name.maxLength;
}

/**
 * Get error message for validation type
 */
export function getErrorMessage(type: keyof typeof errorMessages, field?: string): string {
  const message = errorMessages[type];
  return typeof message === 'function' && field ? message(field) : (message as string);
}
```

---

### 8. seo.ts

Default SEO metadata.

```typescript
/**
 * SEO Constants
 * Default metadata, structured data, Open Graph settings
 */

import type { Metadata } from 'next';
import { siteConfig } from './config';
import { companyInfo } from './company';

// ============================================================================
// Default Metadata
// ============================================================================

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${companyInfo.name} - ${companyInfo.tagline}`,
    template: `%s | ${companyInfo.name}`,
  },

  description: companyInfo.description,

  keywords: [
    "precision engineering",
    "industrial machinery",
    "manufacturing equipment",
    "laboratory instruments",
    "precision components",
    "industrial solutions",
  ],

  authors: [
    {
      name: companyInfo.name,
      url: siteConfig.url,
    },
  ],

  creator: companyInfo.name,
  publisher: companyInfo.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: companyInfo.name,
    title: `${companyInfo.name} - ${companyInfo.tagline}`,
    description: companyInfo.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${companyInfo.name} - ${companyInfo.tagline}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${companyInfo.name} - ${companyInfo.tagline}`,
    description: companyInfo.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// ============================================================================
// Structured Data (JSON-LD)
// ============================================================================

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyInfo.name,
  legalName: companyInfo.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  foundingDate: `${companyInfo.foundedYear}`,
  description: companyInfo.description,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    email: 'contact@shiner.example.com',
    areaServed: 'US',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://twitter.com/shiner',
    'https://linkedin.com/company/shiner',
    'https://facebook.com/shiner',
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: companyInfo.name,
  image: `${siteConfig.url}/logo.png`,
  '@id': siteConfig.url,
  url: siteConfig.url,
  telephone: '+1-555-123-4567',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Industrial Avenue',
    addressLocality: 'Manufacturing City',
    addressRegion: 'MC',
    postalCode: '12345',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  path = '',
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description: description || companyInfo.description,
    keywords: keywords || defaultMetadata.keywords,
    openGraph: {
      title,
      description: description || companyInfo.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description: description || companyInfo.description,
      images: [ogImage],
    },
  };
}
```

---

## Migration Strategy

### Phase 1: Create Files (1-2 hours)

1. Create `/src/constants` directory
2. Copy all implementation files above
3. Adjust values to match your actual company info
4. Test imports work: `import { companyInfo } from '@/constants'`

### Phase 2: Update Navbar (30 minutes)

**Before:**
```typescript
// src/components/global/navbar.tsx
const navLinks = [
  { name: "Products", href: "/products" },
  // ... more hard-coded links
];
```

**After:**
```typescript
// src/components/global/navbar.tsx
import { mainNavLinks, aboutLinks, moreLinks, ctaButton } from '@/constants';

export function Navbar() {
  // Use imported constants
  {mainNavLinks.map((link) => ( /* ... */ ))}
  {aboutLinks.map((link) => ( /* ... */ ))}
  {moreLinks.map((link) => ( /* ... */ ))}

  <GradientButton>
    <Link href={ctaButton.href}>{ctaButton.text}</Link>
  </GradientButton>
}
```

### Phase 3: Update Footer (30 minutes)

```typescript
// src/components/landing/footer.tsx
import {
  companyInfo,
  socialLinks,
  footerSections,
  getCopyrightText,
  primaryEmail
} from '@/constants';

export function Footer() {
  return (
    <footer>
      <h3>{companyInfo.name}</h3>
      <p>{companyInfo.description}</p>

      {footerSections.map(section => (
        <div key={section.title}>
          <h4>{section.title}</h4>
          {section.links.map(link => (
            <Link key={link.href} href={link.href}>{link.name}</Link>
          ))}
        </div>
      ))}

      {socialLinks.map(social => (
        <a key={social.name} href={social.url} aria-label={social.name}>
          <social.icon />
        </a>
      ))}

      <p>{getCopyrightText()}</p>
    </footer>
  );
}
```

### Phase 4: Replace Hard-coded Colors (2-3 hours)

Use find-replace in your IDE:

```bash
# Find: text-[#18181b]
# Replace: text-primary

# Find: text-[#71717a]
# Replace: text-secondary

# Find: bg-[#f9f9fb]
# Replace: bg-secondary

# And so on for all hard-coded colors...
```

### Phase 5: Update All Components (4-6 hours)

Go through each component file and:
1. Remove hard-coded values
2. Import from constants
3. Use semantic names
4. Remove inline styles

---

## Usage Guidelines

### DO ✅

```typescript
// Import from constants
import { companyInfo, routes, designTokens } from '@/constants';

// Use semantic values
<div className="text-primary bg-secondary">

// Use route constants
<Link href={routes.products}>

// Use company info
<a href={`mailto:${primaryEmail}`}>
```

### DON'T ❌

```typescript
// Don't hard-code values
<div className="text-[#18181b] bg-[#f9f9fb]">

// Don't use inline styles for constants
<div style={{ color: '#18181b' }}>

// Don't hard-code URLs
<Link href="/products">

// Don't repeat company info
<p>contact@example.com</p>
```

---

## Testing

After implementation, verify:

- [ ] All navigation links work
- [ ] Social links point to correct URLs
- [ ] Contact email/phone are correct
- [ ] Colors match design system
- [ ] No hard-coded values remain
- [ ] TypeScript has no errors
- [ ] All imports resolve correctly

---

## Maintenance

When updating constants:

1. **Single file change** - update only the constant file
2. **Automatic propagation** - all components use updated value
3. **Type safety** - TypeScript catches breaking changes
4. **Documentation** - update this guide if structure changes

---

## Benefits

After implementation:

✅ **Maintainability**: Change company email in 1 place, updates everywhere
✅ **Type Safety**: TypeScript prevents typos and invalid values
✅ **Consistency**: Same values used across entire app
✅ **Searchability**: Easy to find and understand all constants
✅ **Documentation**: Constants are self-documenting
✅ **Refactoring**: Easy to rename/reorganize without breaking changes

---

**Implementation Time Estimate:** 8-10 hours total

**Priority:** Do this FIRST before any other refactoring!
