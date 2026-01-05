import { getAllProducts } from "@/app/actions/products";
import { ProductsGrid } from "./products-grid";


export async function ProductsData() {
  const products = await getAllProducts({featured:true});
  console.log("PRODUCTS",products);
  return <ProductsGrid products={products} />;
}
