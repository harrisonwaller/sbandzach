/**
 * One-time fetch of the 20 engagement photographs from Zola into
 * /public/media/engagement as engagement-01.jpg … engagement-20.jpg.
 *
 *   npm run media:fetch-zola
 *
 * Idempotent: a photo that already exists on disk (non-empty) is skipped, so
 * the script is safe to re-run. After fetching, run `npm run media:build`.
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ENGAGEMENT_URLS: string[] = [
  "https://images.zola.com/380527b1-5a78-421c-8ff8-ffe03c924f3f",
  "https://images.zola.com/f0cac455-7aff-4a94-88d1-1a5a73e89d96",
  "https://images.zola.com/d1852bc6-6ba3-4b12-b207-93e592f352b5",
  "https://images.zola.com/6a79bc10-1c0a-450b-b918-04e98d991748",
  "https://images.zola.com/7c60bf6d-6376-4297-836e-301c9f16eb17",
  "https://images.zola.com/89a2ec40-854f-423e-ac0a-5048811a8114",
  "https://images.zola.com/db89b70b-50ae-499f-8bba-55ffe631de25",
  "https://images.zola.com/9bcaf540-5a46-48e6-a78e-33a3978cd2f9",
  "https://images.zola.com/3e331f08-a169-45bf-b8e1-d5ebbc0d1dc0",
  "https://images.zola.com/9e4ff3f5-6ec9-46ab-ab13-1c89559f05bc",
  "https://images.zola.com/7bc9e5ea-0e07-4556-83dc-5e9e78e77983",
  "https://images.zola.com/52ffe7dd-2eca-4e98-91c3-6d4fdece5cf1",
  "https://images.zola.com/6a090ac3-df07-4989-9ecc-0c6a74054151",
  "https://images.zola.com/d7c6086c-b0ee-4131-adfa-3c4a2d5eeadb",
  "https://images.zola.com/e74f1d9b-8749-4a50-92d8-a7d68b5fc1fd",
  "https://images.zola.com/253f3ad3-8e1d-42b4-b0f8-5e2352fffb5c",
  "https://images.zola.com/aa25a8b0-085c-4acc-8116-5328553a5342",
  "https://images.zola.com/f67e76d0-0532-4254-b0a6-2a34a0037087",
  "https://images.zola.com/3e1fb62f-e2af-4204-84fb-93a8c2a8cedc",
  "https://images.zola.com/cbad5839-d395-480e-b7a0-71a7e0a60f54",
];

const DEST = path.join(process.cwd(), "public", "media", "engagement");

async function exists(p: string): Promise<boolean> {
  try {
    const s = await stat(p);
    return s.size > 0;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(DEST, { recursive: true });
  let fetched = 0;
  let skipped = 0;

  for (let i = 0; i < ENGAGEMENT_URLS.length; i++) {
    const n = String(i + 1).padStart(2, "0");
    const filename = `engagement-${n}.jpg`;
    const dest = path.join(DEST, filename);

    if (await exists(dest)) {
      skipped++;
      continue;
    }

    const url = ENGAGEMENT_URLS[i];
    process.stdout.write(`  ↓ ${filename}  …`);
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (sbandzach media:fetch-zola)" },
    });
    if (!res.ok) {
      process.stdout.write(`  FAILED (${res.status})\n`);
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    fetched++;
    process.stdout.write(`  ${(buf.length / 1024).toFixed(0)} KB\n`);
  }

  console.log(
    `\n✓ Engagement set ready — ${fetched} fetched, ${skipped} already present (${ENGAGEMENT_URLS.length} total).`,
  );
  console.log("  Next: npm run media:build");
}

main().catch((err) => {
  console.error("\n✗ media:fetch-zola failed:", err.message);
  process.exit(1);
});
