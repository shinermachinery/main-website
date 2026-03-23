import { Star } from "lucide-react";
import type { Product } from "@/lib/sanity-types";

interface ProductSpecificationsSectionProps {
  product: Product;
}

export function ProductSpecificationsSection({
  product,
}: ProductSpecificationsSectionProps) {
  const hasSimpleSpecs =
    product.specifications && product.specifications.length > 0;
  const hasTable =
    product.specificationTable?.columns &&
    product.specificationTable.columns.length > 0 &&
    product.specificationTable.rows &&
    product.specificationTable.rows.length > 0;

  if (!hasSimpleSpecs && !hasTable && !product.application && !product.salientFeatures?.length) {
    return null;
  }

  // Find which columns actually have data
  const visibleColumnIndices: number[] = [];
  if (hasTable) {
    const { columns, rows } = product.specificationTable!;
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const hasData = rows.some(
        (row) => row.cells?.[colIdx] && row.cells[colIdx].trim() !== "",
      );
      if (hasData) {
        visibleColumnIndices.push(colIdx);
      }
    }
  }

  return (
    <section className="space-y-8">
      {/* Application */}
      {product.application && (
        <div className="space-y-3">
          <h2 className="text-xl font-light text-primary">Application</h2>
          <p className="text-muted-foreground">{product.application}</p>
        </div>
      )}

      {/* Salient Features */}
      {product.salientFeatures && product.salientFeatures.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-light text-primary">Salient Features</h2>
          <ul className="space-y-2">
            {product.salientFeatures.map((feature, index) => (
              <li
                key={`feature-${index}`}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <Star className="size-4 shrink-0 fill-brand-green text-brand-green mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Simple Specifications (label/value) */}
      {hasSimpleSpecs && (
        <div className="space-y-3">
          <h2 className="text-xl font-light text-primary">Specifications</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {product.specifications!.map((spec, index) => (
                  <tr
                    key={spec._key}
                    className={
                      index % 2 === 0 ? "bg-secondary" : "bg-background"
                    }
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
        </div>
      )}

      {/* Specification Table (multi-column) */}
      {hasTable && visibleColumnIndices.length > 0 && (
        <div className="space-y-3">
          {!hasSimpleSpecs && (
            <h2 className="text-xl font-light text-primary">Specifications</h2>
          )}
          <div className="rounded-xl border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  {visibleColumnIndices.map((colIdx) => (
                    <th
                      key={`col-${colIdx}`}
                      className="px-4 py-3 text-left font-medium text-foreground whitespace-nowrap"
                    >
                      {product.specificationTable!.columns[colIdx]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.specificationTable!.rows.map((row, rowIdx) => (
                  <tr
                    key={row._key}
                    className={
                      rowIdx % 2 === 0 ? "bg-background" : "bg-secondary"
                    }
                  >
                    {visibleColumnIndices.map((colIdx) => (
                      <td
                        key={`cell-${row._key}-${colIdx}`}
                        className="px-4 py-3 font-light text-muted-foreground whitespace-nowrap"
                      >
                        {row.cells?.[colIdx] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
