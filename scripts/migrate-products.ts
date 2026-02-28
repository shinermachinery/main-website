/**
 * Migration script to convert existing Sanity product documents:
 * 1. `description` (plain text) → `description` (blockContent array)
 * 2. `collection` (single reference) → `collections` (array of references)
 *
 * Run with:
 *   export $(grep -v '^#' .env.local | xargs) && bun run scripts/migrate-products.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-12-22",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

interface RawProduct {
  _id: string;
  title: string;
  description?: string;
  collection?: { _ref: string; _type: string };
  collections?: { _ref: string; _type: string; _key: string }[];
}

async function migrate() {
  console.log("🔄 Fetching all products...");

  // Fetch products with old fields (description as string, collection as single ref)
  const products: RawProduct[] = await client.fetch(
    `*[_type == "product"]{_id, title, description, collection, collections}`
  );

  console.log(`   Found ${products.length} products\n`);

  let descriptionCount = 0;
  let collectionCount = 0;
  let skippedDesc = 0;
  let skippedCol = 0;

  const tx = client.transaction();

  for (const product of products) {
    const patches: Record<string, unknown> = {};
    const unsets: string[] = [];

    // 1. Migrate description: plain text → blockContent
    if (typeof product.description === "string" && product.description.trim()) {
      patches.description = [
        {
          _type: "block",
          _key: `block-${product._id.slice(-8)}`,
          style: "normal",
          children: [
            {
              _type: "span",
              _key: `span-${product._id.slice(-8)}`,
              text: product.description,
              marks: [],
            },
          ],
          markDefs: [],
        },
      ];
      descriptionCount++;
    } else if (product.description === null || product.description === undefined) {
      skippedDesc++;
    } else {
      // Already an array (blockContent) - skip
      skippedDesc++;
    }

    // 2. Migrate collection → collections
    if (product.collection && product.collection._ref) {
      // Has old single reference, convert to array
      patches.collections = [
        {
          _type: "reference",
          _ref: product.collection._ref,
          _key: `col-${product.collection._ref.slice(-8)}`,
        },
      ];
      unsets.push("collection"); // Remove old singular field
      collectionCount++;
    } else if (!product.collections || product.collections.length === 0) {
      skippedCol++;
    } else {
      // Already has collections array - skip
      skippedCol++;
    }

    // Apply patches if any
    if (Object.keys(patches).length > 0 || unsets.length > 0) {
      const patchOps: Record<string, unknown> = {};
      if (Object.keys(patches).length > 0) {
        patchOps.set = patches;
      }
      if (unsets.length > 0) {
        patchOps.unset = unsets;
      }
      tx.patch(product._id, patchOps);
      console.log(`   ✏️  ${product.title}: ${Object.keys(patches).join(", ")}${unsets.length > 0 ? ` (unset: ${unsets.join(", ")})` : ""}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Descriptions to migrate: ${descriptionCount} (skipped: ${skippedDesc})`);
  console.log(`   Collections to migrate:  ${collectionCount} (skipped: ${skippedCol})`);

  if (descriptionCount === 0 && collectionCount === 0) {
    console.log("\n✅ Nothing to migrate — all products are already up to date!");
    return;
  }

  console.log("\n⏳ Committing migration...");
  await tx.commit();
  console.log("✅ Migration complete!");
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
