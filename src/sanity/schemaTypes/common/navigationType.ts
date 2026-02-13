import { MenuIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              description: "Direct link (leave empty if using dropdown)",
            }),
            defineField({
              name: "hasDropdown",
              title: "Has Dropdown",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "dropdownItems",
              title: "Dropdown Items",
              type: "array",
              hidden: ({ parent }) => !parent?.hasDropdown,
              of: [
                defineArrayMember({
                  type: "object",
                  name: "dropdownItem",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "link",
                      title: "Link",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "string",
                      description: "Optional description for mega menu",
                    }),
                  ],
                  preview: {
                    select: {
                      label: "label",
                      link: "link",
                    },
                    prepare({ label, link }) {
                      return {
                        title: label,
                        subtitle: link,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              label: "label",
              link: "link",
              hasDropdown: "hasDropdown",
            },
            prepare({ label, link, hasDropdown }) {
              return {
                title: label,
                subtitle: hasDropdown ? "Dropdown menu" : link,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      description: "Call-to-action button shown in the navbar",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation",
        subtitle: "Main site navigation",
      };
    },
  },
});
