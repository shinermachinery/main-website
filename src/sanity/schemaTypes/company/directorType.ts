import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const directorType = defineType({
  name: "director",
  title: "Director",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      initialValue: "About Our Director",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "name",
      title: "Director Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Position/Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Director Photo",
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
      name: "bio",
      title: "Biography",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "achievements",
      title: "Key Achievements",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
});
