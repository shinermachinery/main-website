export interface BlogPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  publishedAt: string;
  readTime: string;
}

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    _id: "fallback-1",
    title: "The Future of Precision Engineering in Industrial Manufacturing",
    description:
      "Explore how cutting-edge precision engineering is revolutionizing the industrial manufacturing landscape with advanced automation and quality control systems. From CNC machining to laser measurement tools, discover the technologies shaping tomorrow's factories.",
    category: "Engineering",
    slug: "future-precision-engineering",
    publishedAt: "2025-12-15",
    readTime: "5 min read",
  },
  {
    _id: "fallback-2",
    title: "Maximizing Efficiency with Modern Machinery Solutions",
    description:
      "Discover the latest strategies for optimizing your production workflow through intelligent machinery integration and performance monitoring. Learn how smart sensors and predictive maintenance are reducing downtime and increasing overall equipment effectiveness across manufacturing facilities.",
    category: "Machinery",
    slug: "maximizing-efficiency-machinery",
    publishedAt: "2025-12-10",
    readTime: "7 min read",
  },
  {
    _id: "fallback-3",
    title: "Quality Assurance Standards in Laboratory Equipment",
    description:
      "Learn about the stringent quality assurance protocols and testing standards that ensure laboratory equipment meets industry requirements. Understand ISO certification processes, calibration schedules, and validation procedures essential for maintaining measurement accuracy in critical applications.",
    category: "Industry News",
    slug: "quality-assurance-standards",
    publishedAt: "2025-12-05",
    readTime: "6 min read",
  },
  {
    _id: "fallback-4",
    title: "Innovation in Industrial Fabrication Systems",
    description:
      "An in-depth look at how innovative fabrication technologies are transforming the way we approach complex manufacturing challenges. Explore additive manufacturing, robotic welding, and advanced material processing techniques that are pushing the boundaries of what's possible in modern fabrication.",
    category: "Innovation",
    slug: "innovation-fabrication-systems",
    publishedAt: "2025-11-28",
    readTime: "8 min read",
  },
  {
    _id: "fallback-5",
    title: "Sustainable Practices in Modern Engineering",
    description:
      "How the engineering industry is adopting sustainable practices to reduce environmental impact while maintaining high performance standards. From energy-efficient manufacturing processes to recyclable materials and waste reduction strategies, discover how companies are building a greener future.",
    category: "Engineering",
    slug: "sustainable-engineering-practices",
    publishedAt: "2025-11-20",
    readTime: "5 min read",
  },
  {
    _id: "fallback-6",
    title: "Advanced Calibration Techniques for Precision Instruments",
    description:
      "Master the art of calibrating precision instruments to achieve laboratory-grade accuracy in your measurements and testing procedures. This comprehensive guide covers everything from digital calipers and micrometers to coordinate measuring machines and optical comparators.",
    category: "Machinery",
    slug: "advanced-calibration-techniques",
    publishedAt: "2025-11-12",
    readTime: "9 min read",
  },
  {
    _id: "fallback-7",
    title: "The Role of Automation in Quality Control",
    description:
      "Understanding how automated quality control systems are enhancing product consistency and reducing human error in manufacturing. Discover machine vision inspection, statistical process control software, and real-time monitoring systems that ensure every product meets exact specifications.",
    category: "Industry News",
    slug: "automation-quality-control",
    publishedAt: "2025-11-05",
    readTime: "6 min read",
  },
  {
    _id: "fallback-8",
    title: "Material Science Innovations for Industrial Applications",
    description:
      "Explore the latest breakthroughs in material science and how they're enabling new possibilities in industrial equipment design. From high-strength alloys to advanced composites and nano-engineered coatings, learn about materials that are revolutionizing performance and durability.",
    category: "Innovation",
    slug: "material-science-innovations",
    publishedAt: "2025-10-28",
    readTime: "7 min read",
  },
  {
    _id: "fallback-9",
    title: "Building Robust Testing Environments for Laboratory Work",
    description:
      "Best practices for creating controlled testing environments that ensure accurate and reproducible results in laboratory settings. Learn about temperature and humidity control, vibration isolation, clean room standards, and environmental monitoring systems critical for precision testing.",
    category: "Engineering",
    slug: "robust-testing-environments",
    publishedAt: "2025-10-20",
    readTime: "5 min read",
  },
];

// Fallback images for blog posts (Unsplash engineering/machinery images)
export const FALLBACK_BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80", // Engineering workspace
  "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=400&fit=crop&q=80", // Machinery
  "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&h=400&fit=crop&q=80", // Industrial equipment
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&h=400&fit=crop&q=80", // Laboratory
  "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&h=400&fit=crop&q=80", // Technology
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop&q=80", // Engineering tools
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop&q=80", // Manufacturing
  "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&h=400&fit=crop&q=80", // Industrial design
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80", // Precision equipment
];

// Fallback blog post detail content
export const FALLBACK_BLOG_POST_CONTENT = `
<div style="display: flex; flex-direction: column; gap: 40px;">
  <h2 style="font-family: var(--font-plus-jakarta-sans); font-weight: 500; font-size: 30px; line-height: 40px; letter-spacing: -0.75px; color: #18181b;">
    Understanding Modern Engineering Practices
  </h2>
  <p style="font-family: var(--font-plus-jakarta-sans); font-weight: 500; font-size: 20px; line-height: 28px; letter-spacing: -0.5px; color: #71717a;">
    In today's rapidly evolving industrial landscape, precision engineering stands at the forefront of innovation. Advanced automation systems and quality control mechanisms have transformed how we approach manufacturing, enabling unprecedented levels of accuracy and efficiency.
  </p>
  <p style="font-family: var(--font-plus-jakarta-sans); font-weight: 500; font-size: 20px; line-height: 28px; letter-spacing: -0.5px; color: #71717a;">
    Modern machinery leverages cutting-edge technology to deliver consistent results while maintaining strict adherence to industry standards. From initial design to final production, every step is optimized for performance and reliability.
  </p>

  <h2 style="font-family: var(--font-plus-jakarta-sans); font-weight: 500; font-size: 30px; line-height: 40px; letter-spacing: -0.75px; color: #18181b;">
    The Future of Industrial Automation
  </h2>
  <p style="font-family: var(--font-plus-jakarta-sans); font-weight: 500; font-size: 20px; line-height: 28px; letter-spacing: -0.5px; color: #71717a;">
    As we look toward the future, the integration of artificial intelligence and machine learning promises to revolutionize industrial processes further. Smart sensors and predictive maintenance systems are becoming standard features, reducing downtime and improving overall equipment effectiveness.
  </p>
  <p style="font-family: var(--font-plus-jakarta-sans); font-weight: 500; font-size: 20px; line-height: 28px; letter-spacing: -0.5px; color: #71717a;">
    The commitment to excellence in engineering drives continuous improvement across all sectors. By embracing new technologies and methodologies, manufacturers can achieve higher quality standards while optimizing resource utilization and minimizing environmental impact.
  </p>
</div>
`;
