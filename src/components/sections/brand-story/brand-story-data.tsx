import { BrandStoryGrid } from "./brand-story-grid";

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

interface Video {
  _key: string;
  title: string;
  subText: string;
}

interface BrandStoryDataProps {
  title?: string;
  description?: any[];
  videos?: Video[];
  teamMembers?: TeamMember[];
}

export function BrandStoryData({
  title,
  description,
  videos = [],
  teamMembers = [],
}: BrandStoryDataProps) {
  return (
    <BrandStoryGrid
      title={title}
      description={description}
      videos={videos}
      teamMembers={teamMembers}
    />
  );
}
