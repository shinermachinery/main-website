import { getAllProductCollections } from "@/actions/products";
import { Navbar } from "./navbar";

export async function NavbarData() {
  const collections = await getAllProductCollections();

  return <Navbar collections={collections} />;
}
