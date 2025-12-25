import { client } from "@/sanity/lib/client";
import { ProductsGrid } from "./products-grid";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  price?: number;
  features?: string[];
}

export async function ProductsData() {
  const query = `*[_type == "product" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image {
      asset,
      alt
    },
    price,
    features
  }`;

  const products = await client.fetch<Product[]>(query);

  return <ProductsGrid products={products} />;
}
