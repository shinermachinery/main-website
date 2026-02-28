import { Star } from "lucide-react";
import { PortableText } from "@/components/blog/portable-text";
import { GradientBadge } from "@/components/ui/gradient-badge";
import type { Product } from "@/lib/sanity-types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  console.log(product);
  return (
    <div className="flex-1 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-3">
        {/* Collection Badges */}
        {product.collections && product.collections.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.collections.map((col) => (
              <GradientBadge key={col._id}>{col.title}</GradientBadge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-light text-foreground">
          {product.title}
        </h1>

        {/* Description */}
        {product.description && product.description.length > 0 && (
          <div className="text-sm font-light text-muted-foreground prose prose-sm max-w-none">
            <PortableText value={product.description} />
          </div>
        )}
      </div>

      {/* Features / Bullet Points */}
      {product.descriptionBulletPoints &&
        product.descriptionBulletPoints.length > 0 && (
          <div className="space-y-3">
            <ul className="space-y-2">
              {product.descriptionBulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <Star className="fill-brand-green stroke-none" />
                  <span className="text-sm font-light text-muted-foreground">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Price (if available) */}
      {product.price && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Starting from
            </span>
            <span className="text-xl font-light text-foreground">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
