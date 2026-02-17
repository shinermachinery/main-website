import { EnvelopeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "phoneNumbers",
      title: "Phone Numbers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "number",
              title: "Phone Number",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "emails",
      title: "Email Addresses",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "email",
              title: "Email Address",
              type: "string",
              validation: (Rule) => Rule.required().email(),
            }),
          ],
          preview: {
            select: { title: "email", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "offices",
      title: "Office Locations",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Office Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "address",
              title: "Address",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "mapEmbedUrl",
              title: "Google Maps Embed URL",
              type: "url",
              description:
                "Paste the src URL from a Google Maps embed iframe.",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "address" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
