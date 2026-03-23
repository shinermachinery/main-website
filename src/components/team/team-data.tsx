import { client } from "@/sanity/lib/client";
import { TeamGrid } from "./team-grid";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

export async function TeamData() {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image {
      asset,
      alt
    }
  }`;

  const teamMembers = await client.fetch<TeamMember[]>(query);

  return <TeamGrid teamMembers={teamMembers} />;
}
