"use server";

import type { Category, Product, ProductCollection } from "@/lib/sanity-types";
import { getDemoCollections } from "@/lib/demo-data/products";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getAllCategoriesQuery,
  getAllCollectionsQuery,
  getAllProductsQuery,
  getProductBySlugQuery,
  type ProductListParams,
} from "@/sanity/lib/queries";

export const getAllProducts = async (
  options: ProductListParams = {},
): Promise<Product[]> => {
  try {
    const { query, params } = getAllProductsQuery(options);
    const result = await sanityFetch({ query, params });
    return (result.data as Product[]) ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const { query, params } = getAllCategoriesQuery();
    const result = await sanityFetch({ query, params });
    return result.data as Category[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllProductCollections = async (): Promise<
  ProductCollection[]
> => {
  try {
    const { query, params } = getAllCollectionsQuery();
    const result = await sanityFetch({ query, params });
    const collections = (result.data as ProductCollection[]) ?? [];
    if (collections.length === 0) {
      return getDemoCollections();
    }
    return collections;
  } catch (error) {
    console.error("Error fetching product collections:", error);
    return getDemoCollections();
  }
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  try {
    const { query, params } = getProductBySlugQuery(slug);
    const result = await sanityFetch({ query, params });
    return (result.data as Product) ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
