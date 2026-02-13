import { BlockContentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "sections",
      title: "Footer Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerSection",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "footerLink",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      label: "label",
                      url: "url",
                    },
                    prepare({ label, url }) {
                      return {
                        title: label,
                        subtitle: url,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              links: "links",
            },
            prepare({ title, links }) {
              return {
                title,
                subtitle: `${links?.length || 0} links`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
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
          name: "address",
          title: "Address",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
            },
            prepare({ platform }) {
              return {
                title: platform?.charAt(0).toUpperCase() + platform?.slice(1),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "e.g., © 2024 Shiner Machines. All rights reserved.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
        subtitle: "Site footer configuration",
      };
    },
  },
});
