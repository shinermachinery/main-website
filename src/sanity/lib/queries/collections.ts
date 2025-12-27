/**
 * Product Collection GROQ Queries
 * Optimized queries for product collections/categories
 */

import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  COLLECTION_SUMMARY_PROJECTION,
  IMAGE_PROJECTION,
  PRODUCT_SUMMARY_PROJECTION,
} from "./common";
import type { QueryResult } from "./products";

/**
 * Product Collection Full Projection
 * Complete collection data with all fields
 */
const COLLECTION_FULL_PROJECTION = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug {
    current,
    _type
  },
  description,
  image {
    ${IMAGE_PROJECTION}
  },
  featured,
  order
}`;

/**
 * Get All Collections Query
 * Fetches all product collections
 *
 * Performance: Includes product count for each collection
 * Use Cases: Collections listing, navigation
 *
 * @param limit - Optional result limit
 * @returns Query object
 */
export function getAllCollectionsQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("productCollection");
  const orderString = buildOrderString(["order asc", "title asc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} {
      ${COLLECTION_FULL_PROJECTION.replace("{", "").replace("}", "").trim()},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`,
    params: {},
  };
}

/**
 * Get Collection By Slug Query
 * Fetches a single collection with products
 *
 * Performance: Includes all products in the collection
 * Use Cases: Collection detail pages
 *
 * @param slug - Collection slug
 * @param productLimit - Maximum products to include (default: 20)
 * @returns Query object
 */
export function getCollectionBySlugQuery(
  slug: string,
  productLimit: number = 20,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "productCollection" && slug.current == $slug][0] {
      ${COLLECTION_FULL_PROJECTION.replace("{", "").replace("}", "").trim()},
      "products": *[_type == "product" && collection._ref == ^._id] 
        | order(order asc, _createdAt desc) [0...${productLimit}] ${PRODUCT_SUMMARY_PROJECTION}
    }`,
    params: { slug },
  };
}

/**
 * Get Featured Collections Query
 * Fetches collections marked as featured
 *
 * Performance: Optimized for homepage featured collections
 * Use Cases: Homepage collections showcase
 *
 * @param limit - Maximum collections (default: 3)
 * @returns Query object
 */
export function getFeaturedCollectionsQuery(limit: number = 3): QueryResult {
  const conditions = ["featured == true"];
  const filterString = buildFilterString("productCollection", conditions);
  const orderString = buildOrderString(["order asc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${COLLECTION_FULL_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Collection Count Query
 * Returns total number of collections
 *
 * @param featured - Optional filter by featured status
 * @returns Query object
 */
export function getCollectionCountQuery(featured?: boolean): QueryResult {
  const conditions: string[] = [];
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }

  return {
    query: `count(*[${buildFilterString("productCollection", conditions)}])`,
    params: {},
  };
}

/**
 * Get Collections With Product Counts Query
 * Fetches collections sorted by number of products
 *
 * Performance: Useful for showing popular collections
 * Use Cases: Popular collections widget, analytics
 *
 * @param limit - Maximum collections (default: 5)
 * @returns Query object
 */
export function getPopularCollectionsQuery(limit: number = 5): QueryResult {
  return {
    query: `*[_type == "productCollection"] {
      ${COLLECTION_SUMMARY_PROJECTION.replace("{", "").replace("}", "").trim()},
      "productCount": count(*[_type == "product" && references(^._id)])
    } | order(productCount desc) [0...${limit}]`,
    params: {},
  };
}
