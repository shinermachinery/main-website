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
        .icon(() => "📄")
        .child(
          S.list()
            .title("Pages")
            .items([
              // Homepage
              S.listItem()
                .title("Homepage")
                .icon(() => "🏠")
                .child(
                  S.list()
                    .title("Homepage")
                    .items([
                      S.documentTypeListItem("home").title("Home Settings"),
                      S.documentTypeListItem("homepageHero").title("Hero Section"),
                      S.documentTypeListItem("homepageAbout").title("About Section"),
                      S.documentTypeListItem("homepageFeatures").title("Features Section"),
                    ]),
                ),
              S.divider(),
              // About Pages
              S.listItem()
                .title("About")
                .icon(() => "ℹ️")
                .child(
                  S.list()
                    .title("About Pages")
                    .items([
                      S.documentTypeListItem("director").title("Director"),
                      S.documentTypeListItem("missionVision").title("Mission & Vision"),
                      S.documentTypeListItem("whyChooseUs").title("Why Choose Us"),
                    ]),
                ),
              S.divider(),
              // Contact
              S.documentTypeListItem("contactSubmission").title("Contact Submissions"),
            ]),
        ),

      S.divider(),

      // ============================================================
      // COLLECTIONS - Lists of content
      // ============================================================
      S.listItem()
        .title("Collections")
        .icon(() => "📚")
        .child(
          S.list()
            .title("Collections")
            .items([
              // Blog
              S.listItem()
                .title("Blog")
                .icon(() => "📝")
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
                .icon(() => "📦")
                .child(
                  S.list()
                    .title("Products")
                    .items([
                      S.documentTypeListItem("product").title("Products"),
                      S.documentTypeListItem("productCollection").title("Collections"),
                    ]),
                ),
              S.divider(),
              // Projects & Services
              S.listItem()
                .title("Projects & Services")
                .icon(() => "🔧")
                .child(
                  S.list()
                    .title("Projects & Services")
                    .items([
                      S.documentTypeListItem("project").title("Projects"),
                      S.documentTypeListItem("service").title("Services"),
                      S.documentTypeListItem("installation").title("Installations"),
                      S.documentTypeListItem("client").title("Clients"),
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
        .icon(() => "📣")
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
        .icon(() => "⚙️")
        .child(
          S.list()
            .title("Settings")
            .items([
              S.documentTypeListItem("companyStats").title("Company Stats"),
            ]),
        ),
    ]);
