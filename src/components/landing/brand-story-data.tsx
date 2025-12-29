import { client } from "@/sanity/lib/client";
import { BrandStoryGrid } from "./brand-story-grid";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

export async function BrandStoryData() {
  const query = `*[_type == "teamMember"] | order(order asc) [0...4] {
    _id,
    name,
    role,
    image {
      asset,
      alt
    }
  }`;

  const teamMembers = await client.fetch<TeamMember[]>(query);

  return <BrandStoryGrid teamMembers={teamMembers} />;
}
