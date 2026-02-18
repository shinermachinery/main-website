/**
 * Products Actions
 * Server actions for fetching products and collections
 */

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

// ============================================================================
// Types
// ============================================================================

export interface Product {
  id: string;
  title: string;
  slug: string;
  displayType: "gallery" | "textOnly" | "imageText";
  description?: string;
  descriptionBulletPoints?: string[];
  images: string[];
  primaryImage: string;
  body?: any[];
  brochure?: string;
  specifications?: string;
  price?: number;
  features?: string[];
  featured: boolean;
  collection?: Collection;
  relatedProducts?: ProductSummary[];
}

export interface ProductSummary {
  id: string;
  title: string;
  slug: string;
  primaryImage: string;
  price?: number;
  featured: boolean;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

// ============================================================================
// Product Actions
// ============================================================================

/**
 * Get all products
 * @param options - Filtering options
 */
export async function getProducts(options?: {
  featured?: boolean;
  collectionSlug?: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    const limit = options?.limit || 20;
    const conditions: string[] = ['_type == "product"'];

    if (options?.featured !== undefined) {
      conditions.push(`featured == ${options.featured}`);
    }
    if (options?.collectionSlug) {
      conditions.push(
        `collection->slug.current == "${options.collectionSlug}"`,
      );
    }

    const filterString = conditions.join(" && ");

    const { data: products } = await sanityFetch({
      query: `*[${filterString}] | order(order asc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        displayType,
        description,
        descriptionBulletPoints,
        images,
        body,
        brochure,
        specifications,
        price,
        features,
        featured,
        collection-> {
          _id,
          title,
          "slug": slug.current,
          description
        },
        relatedProducts[]-> {
          _id,
          title,
          "slug": slug.current,
          "primaryImage": images[0],
          price,
          featured
        }
      }[0...${limit}]`,
    });

    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product: any) => transformProduct(product));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Get featured products
 * @param limit - Maximum number of products (default: 3)
 */
export async function getFeaturedProducts(
  limit: number = 3,
): Promise<Product[]> {
  return getProducts({ featured: true, limit });
}

/**
 * Get products by collection
 * @param collectionSlug - Collection slug
 * @param limit - Optional result limit
 */
export async function getProductsByCollection(
  collectionSlug: string,
  limit?: number,
): Promise<Product[]> {
  return getProducts({ collectionSlug, limit });
}

/**
 * Get product by slug
 * @param slug - Product slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data: product } = await sanityFetch({
      query: `*[_type == "product" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        displayType,
        description,
        descriptionBulletPoints,
        images,
        body,
        brochure,
        specifications,
        price,
        features,
        featured,
        collection-> {
          _id,
          title,
          "slug": slug.current,
          description
        },
        relatedProducts[]-> {
          _id,
          title,
          "slug": slug.current,
          "primaryImage": images[0],
          price,
          featured
        }
      }`,
      params: { slug },
    });

    if (!product) {
      return null;
    }

    return transformProduct(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Search products
 * @param searchTerm - Search keyword
 * @param limit - Maximum results (default: 20)
 */
export async function searchProducts(
  searchTerm: string,
  limit: number = 20,
): Promise<Product[]> {
  try {
    const { data: products } = await sanityFetch({
      query: `*[_type == "product" && [title, description, features] match $searchTerm] | order(_score desc, order asc) {
        _id,
        title,
        "slug": slug.current,
        displayType,
        description,
        descriptionBulletPoints,
        images,
        body,
        brochure,
        specifications,
        price,
        features,
        featured
      }[0...${limit}]`,
      params: { searchTerm },
    });

    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product: any) => transformProduct(product));
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// ============================================================================
// Collection Actions
// ============================================================================

/**
 * Get all collections
 */
export async function getCollections(): Promise<Collection[]> {
  try {
    const { data: collections } = await sanityFetch({
      query: `*[_type == "productCollection"] | order(order asc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        description
      }`,
    });

    if (!collections || collections.length === 0) {
      return [];
    }

    return collections.map(
      (collection: {
        _id: string;
        title: string;
        slug: string;
        description?: string;
      }) => ({
        id: collection._id,
        title: collection.title,
        slug: collection.slug || "",
        description: collection.description,
      }),
    );
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

/**
 * Get collection by slug
 * @param slug - Collection slug
 */
export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  try {
    const { data: collection } = await sanityFetch({
      query: `*[_type == "productCollection" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description
      }`,
      params: { slug },
    });

    if (!collection) {
      return null;
    }

    return {
      id: collection._id,
      title: collection.title,
      slug: collection.slug || "",
      description: collection.description,
    };
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function transformProduct(product: any): Product {
  return {
    id: product._id,
    title: product.title,
    slug: product.slug || "",
    displayType: product.displayType || "gallery",
    description: product.description,
    descriptionBulletPoints: product.descriptionBulletPoints,
    images: product.images?.map((img: any) => urlFor(img).url()) || [],
    primaryImage: product.images?.[0]
      ? urlFor(product.images[0]).url()
      : "/placeholder-product.jpg",
    body: product.body,
    brochure: product.brochure?.asset?._ref
      ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.brochure.asset._ref.replace("file-", "").replace("-pdf", ".pdf")}`
      : undefined,
    specifications: product.specifications,
    price: product.price,
    features: product.features,
    featured: product.featured || false,
    collection: product.collection
      ? {
          id: product.collection._id,
          title: product.collection.title,
          slug: product.collection.slug || "",
          description: product.collection.description,
        }
      : undefined,
    relatedProducts: product.relatedProducts?.map((p: any) => ({
      id: p._id,
      title: p.title,
      slug: p.slug || "",
      primaryImage: p.primaryImage
        ? urlFor(p.primaryImage).url()
        : "/placeholder-product.jpg",
      price: p.price,
      featured: p.featured || false,
    })),
  };
}
