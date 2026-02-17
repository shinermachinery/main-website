import { ImageCarouselCard } from "@/components/cards/image-carousel-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getInstallations } from "@/sanity/lib/actions";

export async function InstallationsSection() {
  const installations = await getInstallations({ limit: 8 });

  if (installations.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      <SectionHeading
        as="h1"
        title="Our Installations"
        description="A showcase of our precision engineering installations across industries worldwide."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {installations.map((installation) => (
          <ImageCarouselCard
            key={installation.id}
            images={installation.images}
            title={installation.title}
          />
        ))}
      </div>
    </section>
  );
}
