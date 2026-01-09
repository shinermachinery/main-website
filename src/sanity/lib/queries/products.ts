/**
 * Product GROQ Queries
 * Optimized queries for fetching product data from Sanity
 */

import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  COLLECTION_SUMMARY_PROJECTION,
  PRODUCT_FULL_PROJECTION,
  PRODUCT_SUMMARY_PROJECTION,
} from "./common";

/**
 * Query Parameters for Product Listing
 */
export interface ProductListParams {
  /** Filter by featured status */
  featured?: boolean;
  /** Filter by collection slug */
  collectionSlug?: string;
  /** Maximum number of results */
  limit?: number;
  /** Starting index for pagination */
  offset?: number;
}

/**
 * Query Result Type
 * All queries return this structure for consistency
 */
export interface QueryResult<TParams = Record<string, unknown>> {
  /** The GROQ query string */
  query: string;
  /** Parameters to pass to client.fetch() */
  params: TParams;
}

/**
 * Get All Products Query
 * Fetches products with optional filtering, sorting, and pagination
 *
 * Performance: Uses PRODUCT_FULL_PROJECTION for complete data
 * Use Cases: Product listing pages, product grids, filtered searches
 *
 * @param options - Filtering and pagination options
 * @returns Query object with query string and parameters
 *
 * @example
 * ```typescript
 * const { query, params } = getAllProductsQuery({ featured: true, limit: 6 });
 * const products = await client.fetch<Product[]>(query, params);
 * ```
 */
export function getAllProductsQuery(
  options: ProductListParams = {},
): QueryResult<{ collectionSlug?: string }> {
  const { featured, collectionSlug, limit, offset = 0 } = options;

  // Build filter conditions
  const conditions: string[] = [];
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }
  if (collectionSlug) {
    conditions.push("collection->slug.current == $collectionSlug");
  }

  const filterString = buildFilterString("product", conditions);
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit, offset);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${PRODUCT_FULL_PROJECTION}`,
    params: collectionSlug ? { collectionSlug } : {},
  };
}

/**
 * Get Product By Slug Query
 * Fetches a single product with full details including related products and collection
 *
 * Performance: Includes related products with minimal projection
 * Use Cases: Product detail pages
 *
 * @param slug - Product slug
 * @returns Query object
 *
 * @example
 * ```typescript
 * const { query, params } = getProductBySlugQuery("product-name");
 * const product = await client.fetch<Product | null>(query, params);
 * if (!product) notFound();
 * ```
 */
export function getProductBySlugQuery(
  slug: string,
): QueryResult<{ slug: string }> {
  // Remove outer braces from PRODUCT_FULL_PROJECTION since we're already inside a projection block
  const productFields = PRODUCT_FULL_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();

  return {
    query: `*[_type == "product" && slug.current == $slug][0] {
      ${productFields},
      collection-> ${COLLECTION_SUMMARY_PROJECTION},
      relatedProducts[]-> ${PRODUCT_SUMMARY_PROJECTION}
    }`,
    params: { slug },
  };
}

/**
 * Get Featured Products Query
 * Optimized query for homepage/landing featured products
 *
 * Performance: Only fetches featured products, limited by default
 * Use Cases: Homepage featured section, promotional displays
 *
 * @param limit - Maximum number of products (default: 3)
 * @returns Query object
 */
export function getFeaturedProductsQuery(limit: number = 3): QueryResult {
  return getAllProductsQuery({ featured: true, limit });
}

/**
 * Get Products By Collection Query
 * Fetches all products in a specific collection
 *
 * Performance: Filtered by collection reference
 * Use Cases: Collection detail pages
 *
 * @param collectionSlug - Collection slug
 * @param limit - Optional result limit
 * @returns Query object
 */
export function getProductsByCollectionQuery(
  collectionSlug: string,
  limit?: number,
): QueryResult<{ collectionSlug?: string }> {
  return getAllProductsQuery({ collectionSlug, limit });
}

/**
 * Search Products Query
 * Full-text search across product title, description, and features
 *
 * Performance: Uses GROQ match operator for efficient text search
 * Use Cases: Product search functionality
 *
 * @param searchTerm - Search keyword
 * @param limit - Maximum results (default: 20)
 * @returns Query object
 */
export function searchProductsQuery(
  searchTerm: string,
  limit: number = 20,
): QueryResult<{ searchTerm: string }> {
  const filterString = buildFilterString("product", [
    "[title, description, features] match $searchTerm",
  ]);
  const orderString = buildOrderString(["_score desc", "order asc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${PRODUCT_FULL_PROJECTION}`,
    params: { searchTerm },
  };
}

/**
 * Get Product Count Query
 * Returns total number of products
 *
 * Performance: Lightweight count query
 * Use Cases: Pagination metadata, analytics
 *
 * @param featured - Optional filter by featured status
 * @returns Query object
 */
export function getProductCountQuery(featured?: boolean): QueryResult {
  const conditions: string[] = [];
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }

  const filterString = buildFilterString("product", conditions);

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
