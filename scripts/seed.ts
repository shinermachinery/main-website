/**
 * Sanity Seed Script
 * Run with: bun run seed
 *
 * This script seeds initial data into Sanity CMS.
 * Make sure you have SANITY_API_TOKEN in your .env.local file.
 */

import { createClient } from "@sanity/client";

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET",
  );
  process.exit(1);
}

if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN - create one at https://www.sanity.io/manage",
  );
  console.error("Add it to .env.local as SANITY_API_TOKEN=your-token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-12-22",
  useCdn: false,
});

// ============================================================================
// Seed Data
// ============================================================================

const seedData = {
  // Homepage Content
  home: {
    _type: "home",
    _id: "home-seed",
    // Hero Section
    heroHeadline: "Precision Engineered Machinery. Delivered With Confidence.",
    heroDescription:
      "Equip your production line with industry-grade machines designed for reliability, efficiency, and precision.",
    heroPrimaryCta: {
      text: "Request a Quote",
      link: "/contact",
    },
    heroSecondaryCta: {
      text: "View Products",
      link: "/products",
    },
    // About Section
    wordAboutUsTitle: "A Word About Us",
    wordAboutUsDescription: [
      {
        _type: "block",
        _key: "about1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "SHINER is a leading provider of precision-engineered food processing equipment. With over 25 years of experience, we deliver innovative solutions that enhance productivity and quality for our clients.",
          },
        ],
      },
    ],
    gridSectionTitle: "Explore Our Solutions",
    gridSectionDescription: [
      {
        _type: "block",
        _key: "grid1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Discover our comprehensive range of color sorters, grading machines, and processing equipment designed for various industries.",
          },
        ],
      },
    ],
    // Stats Section
    fewMoreFactsTitle: "A few more facts about us",
    facts: [
      { _key: "fact1", number: 25, text: "Years Experience" },
      { _key: "fact2", number: 500, text: "Clients Served" },
      { _key: "fact3", number: 50, text: "Countries Reached" },
      { _key: "fact4", number: 24, text: "Hours Support" },
    ],
    // Steps Section
    stepTitle: "How We Work",
    steps: [
      { _key: "step1", number: 1, text: "Consultation & Assessment" },
      { _key: "step2", number: 2, text: "Custom Solution Design" },
      { _key: "step3", number: 3, text: "Installation & Training" },
      { _key: "step4", number: 4, text: "Ongoing Support" },
    ],
    // Certificates Section (How It Works)
    trustedByFounderTitle: "Trusted by Industry Leaders",
    certificates: [
      {
        _key: "cert1",
        name: "ISO 9001:2015 Certified",
        subDescription:
          "Quality management systems certification ensuring consistent delivery of products that meet customer and regulatory requirements.",
      },
      {
        _key: "cert2",
        name: "CE Marking Compliance",
        subDescription:
          "European conformity marking indicating compliance with health, safety, and environmental protection standards.",
      },
      {
        _key: "cert3",
        name: "Industry Trusted Partner",
        subDescription:
          "Recognized by leading manufacturers worldwide for precision engineering excellence and reliable performance.",
      },
    ],
    // Brand Story Section
    brandStoryTitle: "Our Brand Story",
    brandStoryDescription: [
      {
        _type: "block",
        _key: "story1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Founded with a vision to revolutionize food processing technology, SHINER has grown from a small startup to an industry leader. Our journey is defined by innovation, quality, and unwavering commitment to our clients.",
          },
        ],
      },
    ],
    brandStoryVideos: [
      {
        _key: "video1",
        title: "Company Overview",
        subText: "Learn about our mission and values",
      },
      {
        _key: "video2",
        title: "Manufacturing Excellence",
        subText: "See our state-of-the-art facilities",
      },
      {
        _key: "video3",
        title: "Client Success Stories",
        subText: "Hear from our satisfied customers",
      },
    ],
  },

  // Director
  director: {
    _type: "director",
    _id: "director-seed",
    pageTitle: "Meet Our Director",
    pageSubtitle: "Leading innovation in food processing technology",
    name: "John Smith",
    title: "Founder & Managing Director",
    bio: [
      {
        _type: "block",
        _key: "bio1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "With over 25 years of experience in the food processing industry, John Smith founded SHINER with a vision to revolutionize how businesses approach quality control and sorting technology.",
          },
        ],
      },
    ],
    achievements: [
      "Established 50+ successful plant installations",
      "Pioneered optical sorting technology in the region",
      "Built partnerships with leading international manufacturers",
      "Recognized as industry leader in food processing solutions",
    ],
    email: "director@shiner.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/example",
  },

  // Mission & Vision
  missionVision: {
    _type: "missionVision",
    _id: "mission-vision-seed",
    pageTitle: "Our Mission & Vision",
    pageSubtitle: "Driving excellence in food processing technology",
    missionTitle: "Our Mission",
    missionStatement:
      "To provide cutting-edge food processing solutions that enhance product quality, increase operational efficiency, and drive sustainable growth for our clients. We are committed to delivering innovative technology backed by exceptional service and support.",
    visionTitle: "Our Vision",
    visionStatement:
      "To be the global leader in food processing technology, setting industry standards for quality, innovation, and customer satisfaction. We envision a future where every food processing facility benefits from our advanced solutions.",
  },

  // Why Choose Us
  whyChooseUs: {
    _type: "whyChooseUs",
    _id: "why-choose-us-seed",
    title: "Why Choose SHINER?",
    subtitle: "Trusted by leading food processing companies worldwide",
    reasons: [
      {
        _key: "reason1",
        title: "Japanese Technology",
        description:
          "Our color sorters utilize advanced Japanese CCD sensor technology for unmatched precision and reliability.",
        order: 1,
      },
      {
        _key: "reason2",
        title: "Expert Support",
        description:
          "24/7 technical support and maintenance services to ensure your operations never stop.",
        order: 2,
      },
      {
        _key: "reason3",
        title: "Proven Track Record",
        description:
          "Over 50+ successful installations across India with 99.99% customer satisfaction rate.",
        order: 3,
      },
      {
        _key: "reason4",
        title: "Custom Solutions",
        description:
          "Tailored solutions designed to meet your specific sorting and processing requirements.",
        order: 4,
      },
      {
        _key: "reason5",
        title: "Training & Development",
        description:
          "Comprehensive training programs for your team to maximize equipment efficiency.",
        order: 5,
      },
      {
        _key: "reason6",
        title: "Competitive Pricing",
        description:
          "Best-in-class technology at competitive prices with flexible financing options.",
        order: 6,
      },
    ],
  },

  // Services
  services: [
    {
      _type: "service",
      _id: "service-training",
      title: "Training & Development",
      slug: { _type: "slug", current: "training" },
      description:
        "Comprehensive training programs for operators and maintenance staff to ensure optimal equipment performance and longevity.",
      order: 1,
    },
    {
      _type: "service",
      _id: "service-spare-parts",
      title: "Spare Parts Supply",
      slug: { _type: "slug", current: "spare-parts" },
      description:
        "Genuine spare parts with quick delivery to minimize downtime and maintain peak performance of your equipment.",
      order: 2,
    },
    {
      _type: "service",
      _id: "service-after-sale",
      title: "After-Sale Service",
      slug: { _type: "slug", current: "after-sale-service" },
      description:
        "Dedicated after-sale support including maintenance, repairs, and technical assistance available 24/7.",
      order: 3,
    },
    {
      _type: "service",
      _id: "service-modernization",
      title: "Equipment Modernization",
      slug: { _type: "slug", current: "modernization" },
      description:
        "Upgrade your existing equipment with the latest technology to improve efficiency and extend lifespan.",
      order: 4,
    },
    {
      _type: "service",
      _id: "service-consultancy",
      title: "Consultancy Services",
      slug: { _type: "slug", current: "consultancy" },
      description:
        "Expert consultation for plant setup, equipment selection, and process optimization tailored to your needs.",
      order: 5,
    },
  ],

  // Certifications
  certifications: [
    {
      _type: "certification",
      _id: "cert-iso",
      title: "ISO 9001:2015 Certified",
      description:
        "Our quality management system meets international standards ensuring consistent product and service quality.",
      order: 1,
    },
    {
      _type: "certification",
      _id: "cert-ce",
      title: "CE Marking",
      description:
        "Our products comply with European health, safety, and environmental protection standards.",
      order: 2,
    },
    {
      _type: "certification",
      _id: "cert-fssai",
      title: "FSSAI Approved",
      description:
        "Equipment designed to meet Food Safety and Standards Authority of India requirements.",
      order: 3,
    },
  ],

  // Achievements
  achievements: [
    {
      _type: "achievement",
      _id: "achievement-excellence",
      awardName: "Excellence in Food Technology",
      awardGiver: "Food Processing Industry Association",
      description:
        "Recognized for innovative contributions to food processing technology.",
      order: 1,
    },
    {
      _type: "achievement",
      _id: "achievement-innovation",
      awardName: "Best Innovation Award",
      awardGiver: "National Technology Awards",
      description:
        "Awarded for breakthrough optical sorting technology development.",
      order: 2,
    },
    {
      _type: "achievement",
      _id: "achievement-service",
      awardName: "Customer Service Excellence",
      awardGiver: "Industry Excellence Awards",
      description:
        "Recognized for outstanding customer support and service delivery.",
      order: 3,
    },
  ],

  // Events
  events: [
    {
      _type: "event",
      _id: "event-expo-2024",
      title: "Food Processing Expo 2024",
      slug: { _type: "slug", current: "food-expo-2024" },
      description:
        "Join us at the annual food processing expo showcasing our latest color sorting technology.",
      location: "New Delhi, India",
      order: 1,
    },
    {
      _type: "event",
      _id: "event-workshop",
      title: "Operator Training Workshop",
      slug: { _type: "slug", current: "training-workshop" },
      description:
        "Hands-on training workshop for equipment operators covering maintenance and optimization.",
      location: "Patna, Bihar",
      order: 2,
    },
  ],

  // Client List (company names with project descriptions)
  clientList: [
    {
      _type: "clientList",
      _id: "clientlist-1",
      companyName: "Sunrise Rice Mills",
      projects: ["Dal Mill Project", "Rice Processing Unit"],
      order: 1,
    },
    {
      _type: "clientList",
      _id: "clientlist-2",
      companyName: "Golden Harvest Foods",
      projects: ["Pulse Sorting Line", "Quality Control Setup"],
      order: 2,
    },
    {
      _type: "clientList",
      _id: "clientlist-3",
      companyName: "Premium Agro Industries",
      projects: ["Complete Plant Setup"],
      order: 3,
    },
    {
      _type: "clientList",
      _id: "clientlist-4",
      companyName: "Eastern Grain Processors",
      projects: ["Wheat Sorting Line", "Color Sorter Installation"],
      order: 4,
    },
    {
      _type: "clientList",
      _id: "clientlist-5",
      companyName: "Agri Best Exports",
      projects: ["Export Quality Line"],
      order: 5,
    },
    {
      _type: "clientList",
      _id: "clientlist-6",
      companyName: "National Food Corp",
      projects: ["Multiple Plant Installations"],
      order: 6,
    },
  ],

  // Other Clients (logo marquee)
  otherClients: [
    {
      _type: "otherClient",
      _id: "otherclient-1",
      companyName: "Sunrise Rice Mills",
      order: 1,
    },
    {
      _type: "otherClient",
      _id: "otherclient-2",
      companyName: "Golden Harvest Foods",
      order: 2,
    },
    {
      _type: "otherClient",
      _id: "otherclient-3",
      companyName: "Premium Agro Industries",
      order: 3,
    },
  ],

  // Installations (image carousel cards)
  installations: [
    {
      _type: "installation",
      _id: "install-1",
      title: "Rice Processing Plant",
      description:
        "Complete rice processing and sorting installation with 10 TPH capacity.",
      order: 1,
    },
    {
      _type: "installation",
      _id: "install-2",
      title: "Pulse Sorting Facility",
      description:
        "High-capacity pulse sorting line with optical sorting technology.",
      order: 2,
    },
    {
      _type: "installation",
      _id: "install-3",
      title: "Grain Processing Unit",
      description:
        "Versatile grain processing unit handling wheat, rice, and pulses.",
      order: 3,
    },
    {
      _type: "installation",
      _id: "install-4",
      title: "Export Quality Line",
      description:
        "Premium export-grade sorting facility meeting international standards.",
      order: 4,
    },
    {
      _type: "installation",
      _id: "install-5",
      title: "Seed Processing Plant",
      description: "Specialized seed sorting and processing installation.",
      order: 5,
    },
    {
      _type: "installation",
      _id: "install-6",
      title: "Organic Processing Center",
      description: "Organic certified processing facility with color sorting.",
      order: 6,
    },
  ],

  // Flowcharts
  flowcharts: [
    {
      _type: "flowchart",
      _id: "flowchart-rice",
      title: "Flow Chart of Rice Re-Processing Plant",
      description:
        "Comprehensive process flow diagram showing the complete rice re-processing cycle from raw paddy intake to finished polished rice output.",
      order: 1,
    },
  ],

  // Team Members
  teamMembers: [
    {
      _type: "teamMember",
      _id: "team-1",
      name: "Rajesh Kumar",
      role: "Technical Director",
      bio: "15+ years of experience in food processing technology and equipment installation.",
      order: 1,
    },
    {
      _type: "teamMember",
      _id: "team-2",
      name: "Priya Sharma",
      role: "Sales Manager",
      bio: "Expert in client relations and business development with extensive industry knowledge.",
      order: 2,
    },
    {
      _type: "teamMember",
      _id: "team-3",
      name: "Amit Singh",
      role: "Service Head",
      bio: "Leads our after-sales service team ensuring maximum customer satisfaction.",
      order: 3,
    },
    {
      _type: "teamMember",
      _id: "team-4",
      name: "Neha Patel",
      role: "Training Coordinator",
      bio: "Specializes in operator training and development programs.",
      order: 4,
    },
  ],

  // Company Stats
  companyStats: {
    _type: "companyStats",
    _id: "company-stats-seed",
    yearsExperience: 25,
    projectsCompleted: 50,
    happyClients: 100,
    teamMembers: 30,
  },

  // Site Settings (singleton)
  siteSettings: {
    _type: "siteSettings",
    _id: "siteSettings",
    companyName: "Shiner Machinery",
    tagline:
      "Precision engineering delivered with confidence. Built to perform, built to last.",
    contactEmail: "info@shinermachinery.com",
    contactPhone: "+91 98765 43210",
    address: "Plot No. 12, Industrial Area Phase 2, Patna, Bihar 800014, India",
    socialLinks: [
      {
        _key: "social-fb",
        platform: "facebook",
        url: "https://facebook.com/shinermachinery",
      },
      {
        _key: "social-tw",
        platform: "twitter",
        url: "https://twitter.com/shinermachinery",
      },
      {
        _key: "social-li",
        platform: "linkedin",
        url: "https://linkedin.com/company/shinermachinery",
      },
      {
        _key: "social-ig",
        platform: "instagram",
        url: "https://instagram.com/shinermachinery",
      },
      {
        _key: "social-yt",
        platform: "youtube",
        url: "https://youtube.com/@shinermachinery",
      },
    ],
    seoDefaults: {
      title:
        "Shiner Machinery - Precision Engineered Food Processing Equipment",
      description:
        "Leading provider of precision-engineered food processing equipment including color sorters, grading machines, and processing solutions. 25+ years of excellence.",
    },
  },

  // Navigation (singleton)
  navigation: {
    _type: "navigation",
    _id: "navigation",
    menuItems: [
      {
        _key: "nav-products",
        label: "Products",
        link: "/products",
        hasDropdown: false,
      },
      {
        _key: "nav-projects",
        label: "Projects",
        link: "/projects",
        hasDropdown: false,
      },
      {
        _key: "nav-services",
        label: "Services",
        link: "/services",
        hasDropdown: false,
      },
      { _key: "nav-blog", label: "Blog", link: "/blog", hasDropdown: false },
      {
        _key: "nav-about",
        label: "About Us",
        hasDropdown: true,
        dropdownItems: [
          {
            _key: "dd-about",
            label: "About Us",
            link: "/about",
            description: "Learn about our company",
          },
          {
            _key: "dd-why",
            label: "Why Choose Us",
            link: "/about/why-choose-us",
            description: "Reasons to work with us",
          },
          {
            _key: "dd-mission",
            label: "Mission & Vision",
            link: "/about/mission-vision",
            description: "Our goals and direction",
          },
          {
            _key: "dd-director",
            label: "About Director",
            link: "/about/director",
            description: "Meet our leadership",
          },
        ],
      },
      {
        _key: "nav-more",
        label: "More",
        hasDropdown: true,
        dropdownItems: [
          {
            _key: "dd-events",
            label: "Events",
            link: "/events",
            description: "Upcoming events and expos",
          },
          {
            _key: "dd-contact",
            label: "Contact",
            link: "/contact",
            description: "Get in touch with us",
          },
        ],
      },
    ],
    ctaButton: {
      label: "Get a Quote",
      link: "/contact",
    },
  },

  // Footer (singleton)
  footer: {
    _type: "footer",
    _id: "footer",
    sections: [
      {
        _key: "footer-quick",
        title: "Quick Links",
        links: [
          { _key: "fl-about", label: "About Us", url: "/about" },
          { _key: "fl-products", label: "Products", url: "/products" },
          { _key: "fl-projects", label: "Projects", url: "/projects" },
          { _key: "fl-services", label: "Services", url: "/services" },
          { _key: "fl-contact", label: "Contact", url: "/contact" },
        ],
      },
      {
        _key: "footer-resources",
        title: "Resources",
        links: [
          { _key: "fl-blog", label: "Blog", url: "/blog" },
          { _key: "fl-events", label: "Events", url: "/events" },
          {
            _key: "fl-why",
            label: "Why Choose Us",
            url: "/about/why-choose-us",
          },
          {
            _key: "fl-mission",
            label: "Mission & Vision",
            url: "/about/mission-vision",
          },
        ],
      },
    ],
    contactInfo: {
      email: "info@shinermachinery.com",
      phone: "+91 98765 43210",
      address:
        "Plot No. 12, Industrial Area Phase 2, Patna, Bihar 800014, India",
    },
    socialLinks: [
      {
        _key: "fs-fb",
        platform: "facebook",
        url: "https://facebook.com/shinermachinery",
      },
      {
        _key: "fs-tw",
        platform: "twitter",
        url: "https://twitter.com/shinermachinery",
      },
      {
        _key: "fs-li",
        platform: "linkedin",
        url: "https://linkedin.com/company/shinermachinery",
      },
      {
        _key: "fs-ig",
        platform: "instagram",
        url: "https://instagram.com/shinermachinery",
      },
    ],
    copyrightText: "Shiner Machinery. All rights reserved.",
  },

  // About Page (singleton)
  aboutPage: {
    _type: "aboutPage",
    _id: "aboutPage",
    heroTitle: "Engineering Excellence for Modern Manufacturing",
    heroDescription:
      "Shiner Machinery designs and delivers precision-engineered machines that empower manufacturers to build faster, smarter, and more efficiently.",
    whoWeAre: {
      title: "Who We Are",
      description: [
        {
          _type: "block",
          _key: "wwa1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "wwa-span1",
              text: "Shiner Machinery is a global provider of industrial fabrication machinery, specializing in high-performance solutions for window, door, and glass production lines. With a focus on reliability, automation, and long-term value, we support manufacturers at every stage — from consultation to installation and beyond.",
            },
          ],
        },
      ],
    },
    mission: {
      title: "Our Mission",
      description:
        "To enable manufacturers worldwide with reliable, efficient, and future-ready machinery.",
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the most trusted name in precision engineering, setting global benchmarks for quality and innovation.",
    },
    features: [
      {
        _key: "feat-1",
        icon: "settings",
        title: "Precision Engineering",
        description: "Every machine is built for accuracy and consistency.",
      },
      {
        _key: "feat-2",
        icon: "headset",
        title: "Customer-First Support",
        description: "Long-term partnerships over one-time sales.",
      },
      {
        _key: "feat-3",
        icon: "sparkles",
        title: "Innovation-Driven",
        description: "Continuous improvement in automation and design.",
      },
      {
        _key: "feat-4",
        icon: "globe",
        title: "Global Standards",
        description: "Built to perform across markets and climates.",
      },
    ],
    bottomFeatures: [
      {
        _key: "bf-1",
        icon: "building",
        title: "Industry-tested components",
        description: "Components validated across diverse industries.",
      },
      {
        _key: "bf-2",
        icon: "trending",
        title: "Scalable production solutions",
        description: "Grow from small batch to full production.",
      },
      {
        _key: "bf-3",
        icon: "phone",
        title: "Dedicated after-sales support",
        description: "Support that continues well after delivery.",
      },
      {
        _key: "bf-4",
        icon: "award",
        title: "Proven results worldwide",
        description: "Trusted by manufacturers across the globe.",
      },
    ],
    seo: {
      title: "About Us - Shiner Machinery",
      description:
        "Shiner Machinery designs and delivers precision-engineered machines that empower manufacturers to build faster, smarter, and more efficiently.",
    },
  },

  // Blog Categories
  categories: [
    {
      _type: "category",
      _id: "cat-technology",
      title: "Technology",
      slug: { _type: "slug", current: "technology" },
      description: "Latest updates in food processing technology",
    },
    {
      _type: "category",
      _id: "cat-industry",
      title: "Industry News",
      slug: { _type: "slug", current: "industry-news" },
      description: "News and trends from the food processing industry",
    },
    {
      _type: "category",
      _id: "cat-tips",
      title: "Tips & Guides",
      slug: { _type: "slug", current: "tips-guides" },
      description: "Helpful tips and guides for equipment operation",
    },
  ],

  // Authors
  authors: [
    {
      _type: "author",
      _id: "author-editorial",
      name: "SHINER Editorial Team",
      slug: { _type: "slug", current: "shiner-editorial" },
      bio: [
        {
          _type: "block",
          _key: "bio1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "The SHINER editorial team brings you the latest insights and updates from the food processing industry.",
            },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// Seed Functions
// ============================================================================

async function createDocument(doc: any, name: string) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`✅ Created ${name}: ${result._id}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create ${name}:`, error);
    throw error;
  }
}

async function seed() {
  console.log("🌱 Starting seed process...\n");

  try {
    // Seed global singletons first
    console.log("⚙️ Seeding Global Settings...");
    await createDocument(seedData.siteSettings, "Site Settings");
    await createDocument(seedData.navigation, "Navigation");
    await createDocument(seedData.footer, "Footer");
    await createDocument(seedData.aboutPage, "About Page");

    // Seed homepage content
    console.log("\n🏠 Seeding Homepage...");
    await createDocument(seedData.home, "Homepage");

    // Seed single documents
    await createDocument(seedData.director, "Director");
    await createDocument(seedData.missionVision, "Mission & Vision");
    await createDocument(seedData.whyChooseUs, "Why Choose Us");
    await createDocument(seedData.companyStats, "Company Stats");

    // Seed services
    console.log("\n📦 Seeding Services...");
    for (const service of seedData.services) {
      await createDocument(service, `Service: ${service.title}`);
    }

    // Seed certifications
    console.log("\n📜 Seeding Certifications...");
    for (const cert of seedData.certifications) {
      await createDocument(cert, `Certification: ${cert.title}`);
    }

    // Seed achievements
    console.log("\n🏆 Seeding Achievements...");
    for (const achievement of seedData.achievements) {
      await createDocument(
        achievement,
        `Achievement: ${achievement.awardName}`,
      );
    }

    // Seed events
    console.log("\n📅 Seeding Events...");
    for (const event of seedData.events) {
      await createDocument(event, `Event: ${event.title}`);
    }

    // Seed client list
    console.log("\n👥 Seeding Client List...");
    for (const clientItem of seedData.clientList) {
      await createDocument(clientItem, `Client List: ${clientItem.companyName}`);
    }

    // Seed other clients
    console.log("\n🏢 Seeding Other Clients...");
    for (const clientItem of seedData.otherClients) {
      await createDocument(
        clientItem,
        `Other Client: ${clientItem.companyName}`,
      );
    }

    // Seed installations
    console.log("\n🏭 Seeding Installations...");
    for (const installation of seedData.installations) {
      await createDocument(installation, `Installation: ${installation.title}`);
    }

    // Seed flowcharts
    console.log("\n📊 Seeding Flowcharts...");
    for (const flowchart of seedData.flowcharts) {
      await createDocument(flowchart, `Flowchart: ${flowchart.title}`);
    }

    // Seed team members
    console.log("\n👨‍💼 Seeding Team Members...");
    for (const member of seedData.teamMembers) {
      await createDocument(member, `Team Member: ${member.name}`);
    }

    // Seed categories
    console.log("\n📁 Seeding Categories...");
    for (const category of seedData.categories) {
      await createDocument(category, `Category: ${category.title}`);
    }

    // Seed authors
    console.log("\n✍️ Seeding Authors...");
    for (const author of seedData.authors) {
      await createDocument(author, `Author: ${author.name}`);
    }

    console.log("\n✨ Seed completed successfully!");
    console.log(
      "\nNote: Images need to be uploaded manually through Sanity Studio.",
    );
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}

// Run seed
seed();
