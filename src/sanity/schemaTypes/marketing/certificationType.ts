import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const certificationType = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Certificate Image",
      type: "image",
      description: "Upload the certification image or logo",
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
        "Order in which this certification appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "image",
    },
    prepare(selection) {
      const { title, description, media } = selection;
      return {
        title,
        subtitle: description,
        media,
      };
    },
  },
});
