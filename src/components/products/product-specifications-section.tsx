import type { Product } from "@/lib/sanity-types";
import { CheckCircle2, Info, Star } from "lucide-react";

interface ProductSpecificationsSectionProps {
  product: Product;
}

export function ProductSpecificationsSection({
  product,
}: ProductSpecificationsSectionProps) {

  return (
    <section className="space-y-8">
      {/* Ultra-thin Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
    
          <h2 className="text-2xl font-light text-primary">
            Our Specifications
          </h2>
        </div>
        {product.specifications?.description && (
          <p className="text-sm font-light text-zinc-600">
            {product.specifications.description}
          </p>
        )}
      </div>

      {/* Ultra-thin Specifications Grid */}
      {product.descriptionBulletPoints && product.descriptionBulletPoints.length > 0 && (
        <div className="space-y-3">
        
          <ul className="grid grid-cols-2 gap-2">
            {product.features?.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 group"
              >
                <Star className="fill-brand-green"/>
                <span className="text-sm font-light text-zinc-600 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}


    
    </section>
  );
}
