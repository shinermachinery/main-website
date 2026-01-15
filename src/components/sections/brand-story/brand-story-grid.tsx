"use client";

import { BrandStoryCard } from "@/components/cards/brand-story-card";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/components/blog/portable-text";

interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

interface BrandStoryGridProps {
  title?: string;
  description?: any[];
  videos?: Array<{
    _key: string;
    title: string;
    subText: string;
  }>;
  teamMembers?: TeamMember[];
}

// Fallback team members data when Sanity returns empty (no image property - will use Unsplash placeholders)
const FALLBACK_TEAM_MEMBERS: TeamMember[] = [
  {
    _id: "fallback-1",
    name: "Sarah Chen",
    role: "Chief Engineering Officer",
  },
  {
    _id: "fallback-2",
    name: "Michael Rodriguez",
    role: "Director of Operations",
  },
  {
    _id: "fallback-3",
    name: "Emily Thompson",
    role: "Quality Assurance Lead",
  },
  {
    _id: "fallback-4",
    name: "David Park",
    role: "Technical Innovation Manager",
  },
];

export function BrandStoryGrid({
  title,
  description,
  videos = [],
  teamMembers = [],
}: BrandStoryGridProps) {
  // Use fallback data if no team members from Sanity
  const displayMembers =
    teamMembers && teamMembers.length > 0 ? teamMembers : FALLBACK_TEAM_MEMBERS;

  return (
    <section
      className="py-24 md:py-32 bg-secondary"
      aria-labelledby="brand-story-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header - Two Column Layout */}
          <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
            <div className="flex-1 flex items-start">
              <h2
                id="brand-story-heading"
                className="flex-1 font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.0469rem] text-foreground"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {title || "Our Brand Story"}
              </h2>
            </div>
            <div className="flex-1 font-medium text-[1.25rem] leading-7 tracking-[-0.0313rem] text-muted-foreground">
              {description && description.length > 0 ? (
                <PortableText value={description} />
              ) : (
                <p style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}>
                  With decades of experience in industrial fabrication systems,
                  Shiner Machinery combines precision engineering with
                  world-class support. We empower fabricators globally to build
                  faster, cleaner, and smarter.
                </p>
              )}
            </div>
          </div>

          {/* Team Cards Grid - Flex wrap on all screen sizes */}
          <div className="flex flex-wrap gap-6">
            {displayMembers.slice(0, 4).map((member, index) => {
              // Fallback images for each team member
              const fallbackImages = [
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=1000&fit=crop&q=80",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=1000&fit=crop&q=80",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=1000&fit=crop&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=1000&fit=crop&q=80",
              ];

              const imageUrl = member.image
                ? urlFor(member.image).width(600).height(1000).url()
                : fallbackImages[index % fallbackImages.length];

              return (
                <BrandStoryCard
                  key={member._id}
                  name={member.name}
                  role={member.role || ""}
                  imageUrl={imageUrl}
                  imageAlt={member.image?.alt || member.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
