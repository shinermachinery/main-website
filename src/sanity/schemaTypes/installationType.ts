import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const installationType = defineType({
  name: "installation",
  title: "Installation",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Installation Type",
      type: "string",
      description: "e.g., Commercial, Residential, Industrial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Installation location",
    }),
    defineField({
      name: "image",
      title: "Installation Image",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "datetime",
      description: "When was this installation completed",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this installation appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      location: "location",
      media: "image",
    },
    prepare(selection) {
      const { title, type, location } = selection;
      return {
        ...selection,
        subtitle: `${type}${location ? ` - ${location}` : ""}`,
      };
    },
  },
});
