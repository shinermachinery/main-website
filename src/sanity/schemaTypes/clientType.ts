import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const clientType = defineType({
  name: "client",
  title: "Client",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "List of projects/locations for this client",
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "boolean",
      description: "Display this client with gradient highlight",
      initialValue: false,
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this client appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      highlight: "highlight",
      media: "logo",
    },
    prepare(selection) {
      const { title, highlight } = selection;
      return {
        ...selection,
        subtitle: highlight ? "⭐ Highlighted" : "Standard",
      };
    },
  },
});
