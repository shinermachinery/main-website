/**
 * Seed script to replace product collections in Sanity CMS with 9 new categories.
 * Run with: bun run scripts/seed-collections.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-12-22",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

const collections = [
  {
    title: "Kett Laboratory Equipments",
    slug: "kettLaboratoryEquipments",
    description:
      "Precision laboratory equipment by Kett for moisture analysis, grain testing, and quality control",
    order: 1,
  },
  {
    title: "Shiner Laboratory Equipments",
    slug: "shinerLaboratoryEquipments",
    description:
      "Advanced laboratory equipment by Shiner for grain and food testing applications",
    order: 2,
  },
  {
    title: "Shiner Rice Milling & Processing Machinery",
    slug: "shinerRiceMillingProcessingMachinery",
    description:
      "Complete rice milling and processing solutions for modern rice mills",
    order: 3,
  },
  {
    title: "Shiner Pulse Milling & Processing Machinery",
    slug: "shinerPulseMillingProcessingMachinery",
    description:
      "High-efficiency pulse milling and processing machinery for dal mills",
    order: 4,
  },
  {
    title: "Shiner Wheat & Flour Processing Machinery",
    slug: "shinerWheatFlourProcessingMachinery",
    description:
      "Industrial wheat and flour processing machinery for flour mills",
    order: 5,
  },
  {
    title: "Grain Dryer",
    slug: "grainDryer",
    description:
      "Energy-efficient grain dryers for optimal moisture control and storage preparation",
    order: 6,
  },
  {
    title: "Shiner Color Sorter",
    slug: "shinerColorSorter",
    description:
      "High-precision color sorting machines for grains, pulses, and other commodities",
    order: 7,
  },
  {
    title: "Grain Storage Silos",
    slug: "grainStorageSilos",
    description:
      "Durable grain storage silo systems for safe and efficient bulk grain storage",
    order: 8,
  },
  {
    title: "Packaging Machinery",
    slug: "packagingMachinery",
    description:
      "Automated packaging machinery for grains, pulses, flour, and other food products",
    order: 9,
  },
];

async function seed() {
  // Step 1: Remove collection references from all products
  console.log("Removing collection references from existing products...");
  const products = await client.fetch<{ _id: string }[]>(
    `*[_type == "product" && defined(collection)]{ _id }`,
  );

  if (products.length > 0) {
    const unrefTx = client.transaction();
    for (const product of products) {
      unrefTx.patch(product._id, (p) => p.unset(["collection"]));
    }
    await unrefTx.commit();
    console.log(
      `Cleared collection references from ${products.length} products.`,
    );
  }

  // Step 2: Delete all existing product collections
  console.log("Deleting existing product collections...");
  const existing = await client.fetch<{ _id: string }[]>(
    `*[_type == "productCollection"]{ _id }`,
  );

  if (existing.length > 0) {
    const delTx = client.transaction();
    for (const doc of existing) {
      delTx.delete(doc._id);
    }
    await delTx.commit();
    console.log(`Deleted ${existing.length} existing collections.`);
  }

  // Step 3: Create 9 new collections
  console.log("Creating 9 new product collections...");
  const createTx = client.transaction();
  for (const col of collections) {
    createTx.create({
      _type: "productCollection",
      title: col.title,
      slug: { _type: "slug", current: col.slug },
      description: col.description,
      featured: true,
      order: col.order,
    });
  }

  const result = await createTx.commit();
  console.log(`Done! Created ${result.documentIds.length} product collections.`);

  // Verify
  const verify = await client.fetch<{ title: string; slug: string }[]>(
    `*[_type == "productCollection"] | order(order asc) { title, "slug": slug.current }`,
  );
  console.log("\nCollections in Sanity:");
  for (const c of verify) {
    console.log(`  - ${c.title} (${c.slug})`);
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
