import { writeClient } from "@/sanity/lib/client";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const BROCHURE_PATH = "C:/Users/kulde/Downloads/Shiner brochure NEW (1).pdf";

async function uploadBrochure() {
  console.log("📄 Uploading brochure PDF to Sanity...\n");

  // Read the file
  const fileBuffer = readFileSync(BROCHURE_PATH);
  const fileName = basename(BROCHURE_PATH);

  // Upload as Sanity file asset
  const asset = await writeClient.assets.upload("file", fileBuffer, {
    filename: fileName,
    contentType: "application/pdf",
  });

  console.log(`   ✅ Uploaded: ${asset._id}`);
  console.log(`   📎 URL: ${asset.url}\n`);

  // Fetch all product IDs
  const productIds = await writeClient.fetch<string[]>(
    `*[_type == "product"]._id`,
  );
  console.log(`📦 Patching ${productIds.length} products with brochure...\n`);

  // Patch all products in a transaction
  const tx = writeClient.transaction();
  for (const id of productIds) {
    tx.patch(id, {
      set: {
        brochure: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      },
    });
  }

  await tx.commit();
  console.log(`   ✅ All ${productIds.length} products updated with brochure`);
  console.log("\n🎉 Done!");
}

uploadBrochure().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
