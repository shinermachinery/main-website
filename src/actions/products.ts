"use server";

import type { Category, Product } from "@/lib/sanity-types";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getProductBySlugQuery,
  type ProductListParams,
} from "@/sanity/lib/queries";
import {
  getDemoProducts,
  getDemoProductBySlug,
} from "@/lib/demo-data/products";

export const getAllProducts = async (
  options: ProductListParams = {},
): Promise<Product[]> => {
  try {
    const { query, params } = getAllProductsQuery(options);
    const result = await sanityFetch({ query, params });
    const products = result.data as Product[];

    // Return demo data if no products from Sanity
    if (!products || products.length === 0) {
      console.log("Using demo products as fallback");
      return getDemoProducts(options.limit);
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return demo data on error
    return getDemoProducts(options.limit);
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

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  try {
    const { query, params } = getProductBySlugQuery(slug);
    const result = await sanityFetch({ query, params });
    const product = result.data as Product;

    // Return demo data if no product from Sanity
    if (!product) {
      console.log(`Using demo product for slug: ${slug}`);
      return getDemoProductBySlug(slug);
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    // Return demo data on error
    return getDemoProductBySlug(slug);
  }
};
