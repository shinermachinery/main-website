import { Badge, Star } from "lucide-react";
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
        {/* Collection Badge */}
        {product.collection && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10">
            <Badge className="w-3 h-3 text-brand-blue" strokeWidth={1.5} />
            <span className="text-xs font-medium text-brand-blue">
              {product.collection.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-light text-foreground tracking-tight">
          {product.title}
        </h1>

        {/* Description */}
        {product.description && (
          <p className="text-base font-light text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        )}
      </div>

      {/* Features / Bullet Points */}
      {product.descriptionBulletPoints &&
        product.descriptionBulletPoints.length > 0 && (
          <div className="space-y-3">
            <ul className="space-y-2">
              {product.descriptionBulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <Star className="fill-brand-green" />
                  <span className="text-sm font-light text-muted-foreground leading-relaxed">
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
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Starting from
            </span>
            <span className="text-2xl font-light text-foreground">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
