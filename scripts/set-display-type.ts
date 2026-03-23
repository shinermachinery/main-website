/**
 * Set all products to imageText display type.
 * Run with:
 *   export $(grep -v '^#' .env.local | xargs) && bun run scripts/set-display-type.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-12-22",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

async function run() {
  const products: { _id: string; title: string; displayType?: string }[] =
    await client.fetch('*[_type == "product"]{_id, title, displayType}');

  const toUpdate = products.filter((p) => p.displayType !== "imageText");
  console.log(`Total products: ${products.length}`);
  console.log(`Already imageText: ${products.length - toUpdate.length}`);
  console.log(`To update: ${toUpdate.length}\n`);

  if (toUpdate.length === 0) {
    console.log("✅ All products already set to imageText!");
    return;
  }

  const tx = client.transaction();
  for (const p of toUpdate) {
    tx.patch(p._id, { set: { displayType: "imageText" } });
    console.log(`   ✏️  ${p.title} (was: ${p.displayType || "none"})`);
  }

  await tx.commit();
  console.log(`\n✅ Updated ${toUpdate.length} products to imageText.`);
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
