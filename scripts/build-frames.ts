/**
 * Frame-sequence build pipeline.
 *
 * Reads source webp frames from the TRD-content directory and emits an optimized,
 * uniformly-named sequence into public/frames/hero/. Run via `npm run frames`.
 *
 * Source : ../TRD-content/Generations/Final Renders/frames-12_webp/
 * Target : public/frames/hero/0001.webp .. NNNN.webp at TARGET_WIDTH px wide
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIRS = [
  path.resolve(
    __dirname,
    "../../TRD-content/Generations/Final Renders/frames-12_webp"
  ),
  path.resolve(
    __dirname,
    "../../TRD-content/Generations/Final Renders/frames_webp"
  ),
  path.resolve(__dirname, "../../TRD-content/Generations/Final Renders/frames-12"),
  path.resolve(__dirname, "../../TRD-content/Generations/Final Renders/frames"),
];
const TARGET_DIR = path.resolve(__dirname, "../public/frames/hero");
const TARGET_WIDTH = 1280;
const QUALITY = 72;
const MAX_FRAMES = 96;

async function findSourceDir(): Promise<string | null> {
  for (const dir of SOURCE_DIRS) {
    try {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) {
        const files = await fs.readdir(dir);
        if (files.length > 0) return dir;
      }
    } catch {
      /* try next */
    }
  }
  return null;
}

async function main() {
  const source = await findSourceDir();
  if (!source) {
    console.warn("[frames] No source frame directory found. Skipping.");
    return;
  }

  await fs.mkdir(TARGET_DIR, { recursive: true });

  const all = (await fs.readdir(source))
    .filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f))
    .sort();

  if (all.length === 0) {
    console.warn(`[frames] Source ${source} contains no images.`);
    return;
  }

  // Even-stride downsample to MAX_FRAMES
  const stride = Math.max(1, Math.ceil(all.length / MAX_FRAMES));
  const picked = all.filter((_, i) => i % stride === 0).slice(0, MAX_FRAMES);

  console.log(
    `[frames] Source: ${path.basename(source)} | Found: ${all.length} | Emitting: ${picked.length}`
  );

  let i = 0;
  for (const file of picked) {
    i += 1;
    const inPath = path.join(source, file);
    const outPath = path.join(TARGET_DIR, String(i).padStart(4, "0") + ".webp");
    await sharp(inPath)
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);
    if (i % 12 === 0) console.log(`[frames] ${i}/${picked.length}`);
  }

  await fs.writeFile(
    path.join(TARGET_DIR, "manifest.json"),
    JSON.stringify(
      { count: picked.length, width: TARGET_WIDTH, source: path.basename(source) },
      null,
      2
    )
  );
  console.log(`[frames] Wrote ${picked.length} frames + manifest.json`);
}

main().catch((err) => {
  console.error("[frames] FAILED:", err);
  process.exit(1);
});
