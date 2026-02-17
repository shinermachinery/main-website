import { ProductsGrid } from "@/components/products/products-grid";
import type { Product } from "@/lib/sanity-types";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PRODUCT_FULL_PROJECTION,
  buildFilterString,
  buildOrderString,
} from "@/sanity/lib/queries";

interface ProductsDataProps {
  searchQuery?: string;
  category?: string;
}

export async function ProductsData({
  searchQuery,
  category,
}: ProductsDataProps) {
  try {
    const conditions: string[] = [];
    const params: Record<string, string> = {};

    if (searchQuery) {
      conditions.push("[title, description, features] match $searchTerm");
      params.searchTerm = `${searchQuery}*`;
    }

    if (category) {
      const slugs = category.split(",");
      if (slugs.length === 1) {
        conditions.push("collection->slug.current == $categorySlug");
        params.categorySlug = category;
      } else {
        conditions.push(
          `collection->slug.current in [${slugs.map((_, i) => `$cat${i}`).join(", ")}]`,
        );
        for (let i = 0; i < slugs.length; i++) {
          params[`cat${i}`] = slugs[i];
        }
      }
    }

    const filterString = buildFilterString("product", conditions);
    const orderString = buildOrderString(["order asc", "_createdAt desc"]);

    const query = `*[${filterString}] ${orderString} ${PRODUCT_FULL_PROJECTION}`;
    const result = await sanityFetch({ query, params });
    const products = (result.data as Product[]) ?? [];

    return <ProductsGrid products={products} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <ProductsGrid products={[]} />;
  }
}
