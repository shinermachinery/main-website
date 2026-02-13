import {
  BlockContentIcon,
  BookIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentIcon,
  EarthGlobeIcon,
  HomeIcon,
  InfoOutlineIcon,
  MenuIcon,
  PackageIcon,
  RocketIcon,
  UsersIcon,
  WrenchIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Sanity Studio Structure
 * Organized by content type: Pages, Collections, Media, Settings
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ============================================================
      // PAGES - Single page content
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
              S.divider(),
              // About Page (Singleton)
              S.listItem()
                .title("About Page")
                .icon(InfoOutlineIcon)
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage"),
                ),
              S.divider(),
              // Contact
              S.documentTypeListItem("contactSubmission").title(
                "Contact Submissions",
              ),
            ]),
        ),

      S.divider(),

      // ============================================================
      // COLLECTIONS - Lists of content
      // ============================================================
      S.listItem()
        .title("Collections")
        .icon(BookIcon)
        .child(
          S.list()
            .title("Collections")
            .items([
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
              S.divider(),
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
              S.divider(),
              // Projects & Services
              S.listItem()
                .title("Projects & Services")
                .icon(WrenchIcon)
                .child(
                  S.list()
                    .title("Projects & Services")
                    .items([
                      S.documentTypeListItem("project").title("Projects"),
                      S.documentTypeListItem("service").title("Services"),
                      S.documentTypeListItem("installation").title(
                        "Installations",
                      ),
                      S.documentTypeListItem("client").title("Clients"),
                      S.documentTypeListItem("flowchart").title("Flowcharts"),
                    ]),
                ),
              S.divider(),
              // Team
              S.documentTypeListItem("teamMember").title("Team Members"),
            ]),
        ),

      S.divider(),

      // ============================================================
      // MARKETING - Promotional content
      // ============================================================
      S.listItem()
        .title("Marketing")
        .icon(RocketIcon)
        .child(
          S.list()
            .title("Marketing")
            .items([
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("event").title("Events"),
              S.documentTypeListItem("achievement").title("Achievements"),
              S.documentTypeListItem("certification").title("Certifications"),
            ]),
        ),

      S.divider(),

      // ============================================================
      // SETTINGS - Site-wide settings
      // ============================================================
      S.listItem()
        .title("Settings")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Settings")
            .items([
              // Site Settings (Singleton)
              S.listItem()
                .title("Site Settings")
                .icon(UsersIcon)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings"),
                ),
              // Navigation (Singleton)
              S.listItem()
                .title("Navigation")
                .icon(MenuIcon)
                .child(
                  S.document()
                    .schemaType("navigation")
                    .documentId("navigation"),
                ),
              // Footer (Singleton)
              S.listItem()
                .title("Footer")
                .icon(BlockContentIcon)
                .child(S.document().schemaType("footer").documentId("footer")),
            ]),
        ),
    ]);
