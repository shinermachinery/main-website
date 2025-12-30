import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsGridSection } from "@/components/projects/projects-grid-section";
import { ProjectsGridSectionSkeleton } from "@/components/projects/projects-grid-section-skeleton";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Our Projects | SHINER",
  description:
    "Explore our comprehensive range of products and projects. High-quality machinery and equipment for food processing plants.",
};

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

// Dummy projects data as fallback
const dummyProjects: Project[] = Array.from({ length: 16 }, (_, i) => ({
  id: `project-${i + 1}`,
  title: `Vernier Calipar Mitutoyo ${i + 1}`,
  description:
    "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus mollis phasellus.",
  image: `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80&sig=${i}`,
  slug: `project-${i + 1}`,
}));

async function getProjects() {
  try {
    const projects = await client.fetch(
      `*[_type == "project"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description,
        "image": images[0],
        "slug": slug.current
      }`,
    );

    if (!projects || projects.length === 0) {
      return dummyProjects;
    }

    return projects.map(
      (project: {
        _id: string;
        title: string;
        description: string;
        image?: { asset: { _ref: string } };
        slug: string;
      }) => ({
        id: project._id,
        title: project.title,
        description: project.description,
        image: project.image
          ? urlFor(project.image).url()
          : dummyProjects[0].image,
        slug: project.slug,
      }),
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return dummyProjects;
  }
}

async function ProjectsContent() {
  const projects = await getProjects();
  return <ProjectsGridSection projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        <Suspense fallback={<ProjectsGridSectionSkeleton />}>
          <ProjectsContent />
        </Suspense>
      </div>
    </div>
  );
}
