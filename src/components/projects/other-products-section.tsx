import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "./project-card";

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface OtherProductsSectionProps {
  products: Project[];
}

export function OtherProductsSection({ products }: OtherProductsSectionProps) {
  // Show only first 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <section className="flex flex-col gap-[40px] w-full">
      {/* Header */}
      <div className="flex gap-[24px] items-center w-full">
        <div className="flex-1">
          <h2
            className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#09090b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Other Products
          </h2>
        </div>

        {/* Explore Products Button */}
        <Link
          href="/projects"
          className="flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] rounded-full"
          style={{
            backgroundImage:
              "linear-gradient(91.23deg, rgba(42, 94, 152, 0.1) 15.881%, rgba(24, 183, 90, 0.1) 115.02%)",
            boxShadow: "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.4)",
          }}
        >
          <span
            className="font-medium text-[14px] leading-[20px] bg-clip-text"
            style={{
              fontFamily: "var(--font-plus-jakarta-sans)",
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(90.59deg, rgba(42, 94, 152, 1) 15.881%, rgba(24, 183, 90, 1) 115.02%)",
            }}
          >
            Explore Products
          </span>
          <ArrowUpRight className="size-[20px] text-brand-blue" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {displayProducts.map((product) => (
          <ProjectCard
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  );
}
