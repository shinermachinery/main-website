import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show in 'Our Clients' logo grid section",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      featured: "featured",
      media: "logo",
    },
    prepare(selection) {
      const { title, featured } = selection;
      return {
        ...selection,
        subtitle: featured ? "Featured Client" : "Standard",
      };
    },
  },
});
