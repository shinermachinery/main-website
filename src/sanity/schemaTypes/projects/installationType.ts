import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const installationType = defineType({
  name: "installation",
  title: "Installation",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "images",
      title: "Installation Images",
      type: "array",
      description: "Add multiple installation images (max 10)",
      of: [
        defineArrayMember({
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
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      order: "order",
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        ...selection,
        subtitle: order ? `Order: ${order}` : "No order set",
      };
    },
  },
});
