import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { InstallationCard } from "@/components/cards/installation-card";

interface Installation {
  id: string;
  image: string;
  type: string;
  title: string;
  location: string;
}

async function getInstallations(): Promise<Installation[]> {
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
      return [];
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
          : "/placeholder-installation.jpg",
        type: installation.type,
        title: installation.title,
        location: installation.location || "",
      }),
    );
  } catch (error) {
    console.error("Error fetching installations:", error);
    return [];
  }
}

export async function InstallationsSection() {
  const installations = await getInstallations();

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
