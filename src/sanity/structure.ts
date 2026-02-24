import {
  CogIcon,
  ComposeIcon,
  DocumentIcon,
  EarthGlobeIcon,
  HomeIcon,
  InfoOutlineIcon,
  PackageIcon,
  RocketIcon,
  WrenchIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Sanity Studio Structure
 * Organized into: Pages, Globals, Settings
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ============================================================
      // PAGES - All page-specific content
      // ============================================================
      S.listItem()
        .title("Pages")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              // Homepage (Singleton)
              S.listItem()
                .title("Homepage")
                .icon(HomeIcon)
                .child(S.document().schemaType("home").documentId("home")),
              // About Page (Singleton)
              S.listItem()
                .title("About Page")
                .icon(InfoOutlineIcon)
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage"),
                ),
              S.divider(),
              // Blog
              S.listItem()
                .title("Blog")
                .icon(ComposeIcon)
                .child(
                  S.list()
                    .title("Blog")
                    .items([
                      S.documentTypeListItem("post").title("Posts"),
                      S.documentTypeListItem("category").title("Categories"),
                      S.documentTypeListItem("author").title("Authors"),
                    ]),
                ),
              // Products
              S.listItem()
                .title("Products")
                .icon(PackageIcon)
                .child(
                  S.list()
                    .title("Products")
                    .items([
                      S.documentTypeListItem("product").title("Products"),
                      S.documentTypeListItem("productCollection").title(
                        "Collections",
                      ),
                    ]),
                ),
              // Projects
              S.listItem()
                .title("Projects")
                .icon(WrenchIcon)
                .child(
                  S.list()
                    .title("Projects")
                    .items([
                      S.documentTypeListItem("installation").title(
                        "Installations",
                      ),
                      S.documentTypeListItem("clientList").title("Client List"),
                      S.documentTypeListItem("otherClient").title(
                        "Other Clients",
                      ),
                      S.documentTypeListItem("flowchart").title("Flowcharts"),
                    ]),
                ),
              // Services
              S.documentTypeListItem("service").title("Services"),
              S.divider(),
              // Events
              S.listItem()
                .title("Events")
                .icon(RocketIcon)
                .child(
                  S.list()
                    .title("Events")
                    .items([
                      S.documentTypeListItem("event").title("Events"),
                      S.documentTypeListItem("achievement").title(
                        "Achievements",
                      ),
                      S.documentTypeListItem("certification").title(
                        "Certifications",
                      ),
                    ]),
                ),
              // Contact Page (Singleton)
              S.listItem()
                .title("Contact Page")
                .icon(DocumentIcon)
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage"),
                ),
              // Contact Submissions
              S.documentTypeListItem("contactSubmission").title(
                "Contact Submissions",
              ),
            ]),
        ),

      S.divider(),

      // ============================================================
      // GLOBALS - Components shared across multiple pages
      // ============================================================
      S.listItem()
        .title("Globals")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Globals")
            .items([
              // Shared content used on multiple pages
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("teamMember").title("Team Members"),
            ]),
        ),

      S.divider(),

      // ============================================================
      // SETTINGS - Site-wide configuration
      // ============================================================
      S.listItem()
        .title("Settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
