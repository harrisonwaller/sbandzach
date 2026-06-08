/**
 * Import the curated wedding media into public/media/wedding/*.
 * Sources: full-res originals (~/dev/sbz-curate/orig), the owner's hand-picked
 * keepers (~/.claude/image-cache/...), and clips (~/dev/sbz-curate/clips).
 * Photos → max 2000px q82. Clips → H.264 CRF24 + poster. Re-runnable.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const exec = promisify(execFile);
const HOME = os.homedir();
const ORIG = path.join(HOME, "dev/sbz-curate/orig");
const CLIPS = path.join(HOME, "dev/sbz-curate/clips");
const PICK = path.join(HOME, ".claude/image-cache/56c85647-befe-407e-af01-60ac86fbff4b");
const DEST = path.join(process.cwd(), "public/media/wedding");

// [sourceAbsPath, destChapterFolder, destName]
const PHOTOS = [
  // Getting ready (candid)
  [path.join(ORIG, "IMG_0014.jpg"), "ceremony", "ready-01"], // bride on lakehouse steps
  [path.join(PICK, "6.png"), "ceremony", "ready-02"],        // bathroom helping bride (funny)
  [path.join(PICK, "8.png"), "ceremony", "ready-03"],        // mirror selfie
  [path.join(ORIG, "IMG_0006.jpg"), "ceremony", "ready-04"], // bridesmaids laughing/toasting
  // Ceremony
  [path.join(PICK, "7.jpeg"), "ceremony", "cer-01"],         // walking with dad
  [path.join(ORIG, "IMG_1683.jpg"), "ceremony", "cer-02"],   // arriving at the altar
  [path.join(PICK, "1.png"), "ceremony", "cer-03"],          // bride + maid (owner keeper)
  [path.join(ORIG, "IMG_1687.jpg"), "ceremony", "cer-04"],   // dress lace-back detail
  [path.join(ORIG, "IMG_0054.jpg"), "ceremony", "the-kiss"], // hero
  // On the green
  [path.join(ORIG, "IMG_1586.jpg"), "cocktail", "green-01"], // bridesmaids by the lake
  [path.join(ORIG, "IMG_1584.jpg"), "cocktail", "green-02"], // full wedding party under pine
  [path.join(ORIG, "IMG_0111 2.jpg"), "cocktail", "green-03"], // couple clubhouse portrait
  [path.join(ORIG, "IMG_1692.jpg"), "cocktail", "green-04"], // guests laughing selfie
  [path.join(ORIG, "IMG_0201.jpg"), "cocktail", "cake"],     // the cake by the lake
  // Reception (purple, couple + family)
  [path.join(ORIG, "IMG_0024.jpg"), "reception", "dance-01"], // onto the floor with mom + groom
  [path.join(ORIG, "IMG_0106.jpg"), "reception", "dance-02"], // couple + family laughing
  // After party (teal, crescendo)
  [path.join(ORIG, "IMG_0110.jpg"), "afterparty", "party-01"], // bride centered, friends dancing
  [path.join(ORIG, "IMG_0102.jpg"), "afterparty", "party-02"], // bride hug, laughing
  [path.join(ORIG, "IMG_0112.jpg"), "afterparty", "party-03"], // bridesmaids hug
  [path.join(ORIG, "IMG_0115.jpg"), "afterparty", "party-04"], // bridesmaids arms-up cheer
];

// [sourceClip, destChapterFolder, destName]
const VIDEOS = [
  [path.join(CLIPS, "IMG_7967.MP4"), "reception", "reception-film"], // purple, couple/family (funny)
  [path.join(CLIPS, "IMG_7992.MP4"), "afterparty", "party-film"],    // teal peak
];

async function main() {
  // Clean prior import so nothing stale lingers.
  for (const ch of ["ceremony", "cocktail", "reception", "afterparty"]) {
    await rm(path.join(DEST, ch), { recursive: true, force: true });
    await mkdir(path.join(DEST, ch), { recursive: true });
  }

  let p = 0;
  for (const [src, ch, name] of PHOTOS) {
    await sharp(src)
      .rotate()
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(DEST, ch, `${name}.jpg`));
    p++;
  }
  console.log(`✓ ${p} photos optimized`);

  let v = 0;
  for (const [src, ch, name] of VIDEOS) {
    const mp4 = path.join(DEST, ch, `${name}.mp4`);
    const poster = path.join(DEST, ch, `${name}.jpg`);
    await exec("ffmpeg", [
      "-y", "-i", src,
      "-vf", "scale='min(1280,iw)':-2",
      "-c:v", "libx264", "-crf", "24", "-preset", "slow",
      "-an", "-movflags", "+faststart", mp4,
    ]);
    const dur = await videoDuration(src);
    await exec("ffmpeg", ["-y", "-ss", (dur * 0.2).toFixed(2), "-i", src, "-frames:v", "1", "-q:v", "3", poster]);
    v++;
  }
  console.log(`✓ ${v} clips compressed + posters extracted`);
}

async function videoDuration(file) {
  const { stdout } = await exec("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=nw=1:nk=1", file,
  ]);
  return parseFloat(stdout.trim()) || 6;
}

main().catch((e) => {
  console.error("import failed:", e);
  process.exit(1);
});
