import type { Product, ProductCollection, PortableTextBlock } from "@/lib/sanity-types";

/** Helper to create a simple Portable Text block from a string */
function textBlock(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "block-1",
      style: "normal",
      children: [{ _type: "span", _key: "span-1", text, marks: [] }],
      markDefs: [],
    },
  ];
}

// Demo Product Collections
export const demoCollections: ProductCollection[] = [
  {
    _id: "collection-1",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Kett Laboratory Equipments",
    slug: { current: "kettLaboratoryEquipments", _type: "slug" },
    description: "Precision laboratory equipment by Kett for moisture analysis, grain testing, and quality control",
    featured: true,
    order: 1,
  },
  {
    _id: "collection-2",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Shiner Laboratory Equipments",
    slug: { current: "shinerLaboratoryEquipments", _type: "slug" },
    description: "Advanced laboratory equipment by Shiner for grain and food testing applications",
    featured: true,
    order: 2,
  },
  {
    _id: "collection-3",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Shiner Rice Milling & Processing Machinery",
    slug: { current: "shinerRiceMillingProcessingMachinery", _type: "slug" },
    description: "Complete rice milling and processing solutions for modern rice mills",
    featured: true,
    order: 3,
  },
  {
    _id: "collection-4",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Shiner Pulse Milling & Processing Machinery",
    slug: { current: "shinerPulseMillingProcessingMachinery", _type: "slug" },
    description: "High-efficiency pulse milling and processing machinery for dal mills",
    featured: true,
    order: 4,
  },
  {
    _id: "collection-5",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Shiner Wheat & Flour Processing Machinery",
    slug: { current: "shinerWheatFlourProcessingMachinery", _type: "slug" },
    description: "Industrial wheat and flour processing machinery for flour mills",
    featured: true,
    order: 5,
  },
  {
    _id: "collection-6",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Grain Dryer",
    slug: { current: "grainDryer", _type: "slug" },
    description: "Energy-efficient grain dryers for optimal moisture control and storage preparation",
    featured: true,
    order: 6,
  },
  {
    _id: "collection-7",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Shiner Color Sorter",
    slug: { current: "shinerColorSorter", _type: "slug" },
    description: "High-precision color sorting machines for grains, pulses, and other commodities",
    featured: true,
    order: 7,
  },
  {
    _id: "collection-8",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Grain Storage Silos",
    slug: { current: "grainStorageSilos", _type: "slug" },
    description: "Durable grain storage silo systems for safe and efficient bulk grain storage",
    featured: true,
    order: 8,
  },
  {
    _id: "collection-9",
    _type: "productCollection",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Packaging Machinery",
    slug: { current: "packagingMachinery", _type: "slug" },
    description: "Automated packaging machinery for grains, pulses, flour, and other food products",
    featured: true,
    order: 9,
  },
];

// Default demo collection (first one)
export const demoCollection: ProductCollection = demoCollections[0];

// Demo Products with full data
export const demoProducts: Product[] = [
  {
    _id: "product-1",
    _type: "product",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Advanced Processing Unit X200",
    slug: { current: "advanced-processing-unit-x200", _type: "slug" },
    displayType: "gallery",
    description: textBlock(
      "State-of-the-art processing unit designed for maximum efficiency and reliability in industrial applications.",
    ),
    descriptionBulletPoints: [
      "High-speed processing with 99.9% uptime guarantee",
      "Energy-efficient design reducing power consumption by 40%",
      "Smart monitoring system with real-time analytics",
      "Modular architecture for easy maintenance and upgrades",
      "Industry 4.0 ready with IoT connectivity",
    ],
    images: [
      {
        asset: { _ref: "image-1", _type: "reference" },
        alt: "Processing Unit Front View",
      },
      {
        asset: { _ref: "image-2", _type: "reference" },
        alt: "Processing Unit Side View",
      },
      {
        asset: { _ref: "image-3", _type: "reference" },
        alt: "Processing Unit Control Panel",
      },
    ],
    specifications: [
      { _key: "spec-1", label: "Processing Speed", value: "5000 units/hour" },
      { _key: "spec-2", label: "Power Consumption", value: "450W" },
      { _key: "spec-3", label: "Dimensions", value: "200cm x 150cm x 180cm" },
      { _key: "spec-4", label: "Weight", value: "850 kg" },
      { _key: "spec-5", label: "Operating Temperature", value: "-10°C to 45°C" },
      { _key: "spec-6", label: "Warranty", value: "5 years comprehensive" },
    ],
    price: 125000,
    features: [
      "AI-Powered",
      "Energy Efficient",
      "24/7 Support",
      "Remote Monitoring",
      "Modular Design",
    ],
    collections: [demoCollections[0]],
    featured: true,
    order: 1,
  },
  {
    _id: "product-2",
    _type: "product",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Precision Cutting System Pro",
    slug: { current: "precision-cutting-system-pro", _type: "slug" },
    displayType: "gallery",
    description: textBlock(
      "Ultra-precise cutting system with advanced laser technology for industrial manufacturing.",
    ),
    descriptionBulletPoints: [
      "Laser precision with 0.001mm accuracy",
      "Automatic calibration system",
      "Multi-material compatibility",
      "Safety certified to international standards",
    ],
    images: [
      {
        asset: { _ref: "image-4", _type: "reference" },
        alt: "Cutting System Overview",
      },
    ],
    specifications: [
      { _key: "spec-1", label: "Cutting Speed", value: "50mm/second" },
      { _key: "spec-2", label: "Accuracy", value: "±0.001mm" },
      { _key: "spec-3", label: "Max Material Thickness", value: "100mm" },
      { _key: "spec-4", label: "Power", value: "2000W" },
    ],
    price: 89000,
    features: ["Laser Technology", "Auto-Calibration", "Safety Certified"],
    collections: [demoCollections[2]],
    featured: false,
    order: 2,
  },
  {
    _id: "product-3",
    _type: "product",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Smart Control Hub Elite",
    slug: { current: "smart-control-hub-elite", _type: "slug" },
    displayType: "gallery",
    description: textBlock(
      "Centralized control system for managing multiple industrial processes with AI-driven optimization.",
    ),
    descriptionBulletPoints: [
      "Manage up to 100 connected devices",
      "Real-time data visualization",
      "Predictive maintenance alerts",
      "Cloud-based backup and recovery",
    ],
    images: [
      {
        asset: { _ref: "image-5", _type: "reference" },
        alt: "Control Hub Interface",
      },
    ],
    specifications: [
      { _key: "spec-1", label: "Max Connections", value: "100 devices" },
      { _key: "spec-2", label: "Response Time", value: "<10ms" },
      { _key: "spec-3", label: "Data Storage", value: "10TB" },
      { _key: "spec-4", label: "Uptime", value: "99.99%" },
    ],
    price: 45000,
    features: ["AI-Optimized", "Cloud Backup", "Real-time Analytics"],
    collections: [demoCollections[6]],
    featured: true,
    order: 3,
  },
  {
    _id: "product-4",
    _type: "product",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: "Automated Assembly Line V5",
    slug: { current: "automated-assembly-line-v5", _type: "slug" },
    displayType: "gallery",
    description: textBlock(
      "Complete automated assembly solution with robotic integration and quality control systems.",
    ),
    descriptionBulletPoints: [
      "Fully automated operation with minimal supervision",
      "Integrated quality control at every stage",
      "Flexible configuration for different products",
      "ROI within 18 months guaranteed",
    ],
    images: [
      {
        asset: { _ref: "image-6", _type: "reference" },
        alt: "Assembly Line Overview",
      },
    ],
    specifications: [
      { _key: "spec-1", label: "Production Rate", value: "1000 units/hour" },
      { _key: "spec-2", label: "Accuracy Rate", value: "99.95%" },
      { _key: "spec-3", label: "Line Length", value: "50 meters" },
      { _key: "spec-4", label: "Operators Required", value: "2-3" },
    ],
    price: 750000,
    features: ["Robotic Integration", "Quality Control", "Flexible Config"],
    collections: [demoCollections[8]],
    featured: false,
    order: 4,
  },
];

// Helper to get demo collections
export function getDemoCollections(): ProductCollection[] {
  return demoCollections;
}

// Helper to get demo product by slug
export function getDemoProductBySlug(slug: string): Product | null {
  return demoProducts.find((p) => p.slug.current === slug) || null;
}

// Helper to get demo products with optional limit
export function getDemoProducts(limit?: number): Product[] {
  return limit ? demoProducts.slice(0, limit) : demoProducts;
}

// Helper to get related demo products
export function getDemoRelatedProducts(
  currentProductId: string,
  limit: number = 4,
): Product[] {
  return demoProducts.filter((p) => p._id !== currentProductId).slice(0, limit);
}

// Demo placeholder image URLs (using placeholder service)
export const demoImageUrls = {
  "image-1":
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=900&fit=crop",
  "image-2":
    "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&h=900&fit=crop",
  "image-3":
    "https://images.unsplash.com/photo-1581092160607-ee22df5ceb4a?w=1200&h=900&fit=crop",
  "image-4":
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=900&fit=crop",
  "image-5":
    "https://images.unsplash.com/photo-1581092334319-83c4a3f8f7f1?w=1200&h=900&fit=crop",
  "image-6":
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&h=900&fit=crop",
};

// Helper to get demo image URL
export function getDemoImageUrl(ref: string): string {
  return (
    demoImageUrls[ref as keyof typeof demoImageUrls] || demoImageUrls["image-1"]
  );
}
