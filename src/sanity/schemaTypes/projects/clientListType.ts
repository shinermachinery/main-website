import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const clientListType = defineType({
  name: "clientList",
  title: "Client List",
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
      description: "List of project descriptions for this client",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
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
      title: "companyName",
      projects: "projects",
    },
    prepare(selection) {
      const { title, projects } = selection;
      const count = projects?.length || 0;
      return {
        title,
        subtitle: `${count} project${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
