import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Job title or position",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "Short biography",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this team member appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
