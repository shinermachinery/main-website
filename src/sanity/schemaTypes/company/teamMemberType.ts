import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

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
      title: "Biography",
      type: "array",
      description: "Biography of the team member",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        }),
      ],
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
      name: "isDirector",
      title: "Is Director",
      type: "boolean",
      description: "Mark this team member as Director for spotlight section",
      initialValue: false,
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "List of achievements (shown for Director)",
      hidden: ({ parent }) => !parent?.isDirector,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Direct contact email (shown for Director)",
      hidden: ({ parent }) => !parent?.isDirector,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isDirector?: boolean };
          if (parent?.isDirector && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              return "Please enter a valid email address";
            }
          }
          return true;
        }),
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
      role: "role",
      media: "image",
      isDirector: "isDirector",
    },
    prepare(selection) {
      const { title, role, isDirector } = selection;
      return {
        ...selection,
        title: `${title} ${isDirector ? "(Director)" : ""}`,
        subtitle: role,
      };
    },
  },
});
