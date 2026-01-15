import { getInstallations } from "@/sanity/lib/actions";
import { InstallationCard } from "@/components/cards/installation-card";

export async function InstallationsSection() {
  const installations = await getInstallations(6);

  if (installations.length === 0) {
    return (
      <section className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 font-medium">
          <h1 className="text-4xl font-medium text-foreground">
            Some of Our Installations
          </h1>
          <p className="text-lg text-muted-foreground tracking-[-0.0313rem]">
            Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
            ullamcorper purus
          </p>
        </div>
        <p className="text-lg text-muted-foreground text-center py-8">
          No installations to display at this time.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h1 className="text-4xl font-medium text-foreground">
          Some of Our Installations
        </h1>
        <p className="text-lg text-muted-foreground tracking-[-0.0313rem]">
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {installations.map((installation) => (
          <InstallationCard key={installation.id} {...installation} />
        ))}
      </div>
    </section>
  );
}
