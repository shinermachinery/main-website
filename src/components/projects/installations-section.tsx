import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { InstallationCard } from "@/components/global/cards";
import { dummyInstallations } from "@/data/fallback/installations";

interface Installation {
  id: string | number;
  image: string;
  type: string;
  title: string;
  location: string;
}

async function getInstallations() {
  try {
    const installations = await client.fetch(
      `*[_type == "installation"] | order(order asc, _createdAt desc) {
        _id,
        title,
        type,
        location,
        image
      }[0...6]`,
    );

    if (!installations || installations.length === 0) {
      return dummyInstallations;
    }

    return installations.map(
      (installation: {
        _id: string;
        image?: any;
        type: string;
        title: string;
        location?: string;
      }) => ({
        id: installation._id,
        image: installation.image
          ? urlFor(installation.image).url()
          : dummyInstallations[0].image,
        type: installation.type,
        title: installation.title,
        location: installation.location || "",
      }),
    );
  } catch (error) {
    console.error("Error fetching installations:", error);
    return dummyInstallations;
  }
}

export async function InstallationsSection() {
  const installations = await getInstallations();
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

      {/* Grid - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {installations.slice(0, 3).map((installation: Installation) => (
          <InstallationCard key={installation.id} {...installation} />
        ))}
      </div>

      {/* Grid - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {installations.slice(3, 6).map((installation: Installation) => (
          <InstallationCard key={installation.id} {...installation} />
        ))}
      </div>
    </section>
  );
}
