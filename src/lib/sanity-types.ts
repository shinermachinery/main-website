/**
 * TypeScript type definitions for Sanity CMS schema types
 * These types align with the schema definitions in src/sanity/schemaTypes/
 */

// ============================================================================
// Base Types
// ============================================================================

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFile {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
};

// ============================================================================
// Document Types
// ============================================================================

/**
 * Category Type
 * Used for categorizing blog posts
 */
export interface Category {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  description?: string;
}

/**
 * Author Type
 * Blog post authors with profiles
 */
export interface Author {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

/**
 * Post Type
 * Blog posts with rich content
 */
export interface Post {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  author?: Author;
  mainImage?: SanityImage;
  categories?: Category[];
  publishedAt?: string;
  body?: PortableTextBlock[];
}

/**
 * Product Collection Type
 * Grouping mechanism for products
 */
export interface ProductCollection {
  _id: string;
  _type: "productCollection";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  image?: SanityImage;
  featured: boolean;
  order?: number;
}

/**
 * Product Specification
 * Individual spec item (label + value)
 */
export interface ProductSpecItem {
  _key: string;
  label: string;
  value: string;
}

/**
 * Product Specifications Object
 */
export interface ProductSpecifications {
  description?: string;
  specs?: ProductSpecItem[];
}

/**
 * Product Type
 * Complex product with images, specs, relations
 */
export interface Product {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  displayType: "gallery" | "textOnly" | "imageText";
  description?: string;
  descriptionBulletPoints?: string[];
  images?: SanityImage[];
  body?: PortableTextBlock[];
  brochure?: SanityFile;
  specifications?: ProductSpecifications;
  price?: number;
  relatedProducts?: Product[];
  collection?: ProductCollection;
  features?: string[];
  featured: boolean;
  order?: number;
}

/**
 * Team Member Type
 * Team profiles with photos and bios
 */
export interface TeamMember {
  _id: string;
  _type: "teamMember";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  role: string;
  bio?: string;
  image?: SanityImage;
  order?: number;
}

/**
 * Testimonial Type
 * Customer testimonials with ratings
 */
export interface Testimonial {
  _id: string;
  _type: "testimonial";
  _createdAt: string;
  _updatedAt: string;
  customerName: string;
  role?: string;
  content: string;
  rating: number;
  image?: SanityImage;
  featured: boolean;
  order?: number;
}

/**
 * Contact Submission Type
 * Form submissions (admin-only)
 */
export interface ContactSubmission {
  _id: string;
  _type: "contactSubmission";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: "new" | "read" | "archived";
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Generic Sanity document with common fields
 */
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev?: string;
}

/**
 * Sanity reference type
 */
export interface SanityReference<_T = string> {
  _type: "reference";
  _ref: string;
  _weak?: boolean;
}

// ============================================================================
// Query Result Types
// ============================================================================

/**
 * Product with populated relations
 */
export interface ProductWithRelations
  extends Omit<Product, "collection" | "relatedProducts"> {
  collection?: ProductCollection;
  relatedProducts?: Product[];
}

/**
 * Post with populated relations
 */
export interface PostWithRelations extends Omit<Post, "author" | "categories"> {
  author?: Author;
  categories?: Category[];
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Paginated result
 */
export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}
