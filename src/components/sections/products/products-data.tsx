import { getAllProducts } from "@/actions/products";
import { ProductsGrid } from "./products-section";

export async function ProductsData() {
  const products = await getAllProducts({ featured: true });
  console.log("PRODUCTS", products);
  return <ProductsGrid products={products} />;
}
