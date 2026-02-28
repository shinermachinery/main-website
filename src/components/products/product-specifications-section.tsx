import type { Product } from "@/lib/sanity-types";

interface ProductSpecificationsSectionProps {
  product: Product;
}

export function ProductSpecificationsSection({
  product,
}: ProductSpecificationsSectionProps) {
  if (!product.specifications || product.specifications.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-light text-primary">Specifications</h2>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {product.specifications.map((spec, index) => (
              <tr
                key={spec._key}
                className={index % 2 === 0 ? "bg-secondary" : "bg-background"}
              >
                <td className="px-4 py-3 font-medium text-foreground w-1/3">
                  {spec.label}
                </td>
                <td className="px-4 py-3 font-light text-muted-foreground">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
