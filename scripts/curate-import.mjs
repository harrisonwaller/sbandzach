/**
 * One-shot import of the curated wedding media into public/media/wedding/*.
 * - Photos: downscaled to max 2000px, q82 (sharp).
 * - Clips: compressed (H.264, CRF 24, no audio, faststart) + poster frame.
 * Sources live in ~/dev/sbz-curate/ (orig + clips). Re-runnable.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const exec = promisify(execFile);
const HOME = os.homedir();
const ORIG = path.join(HOME, "dev/sbz-curate/orig");
const CLIPS = path.join(HOME, "dev/sbz-curate/clips");
const DEST = path.join(process.cwd(), "public/media/wedding");

// photo map: [sourceIMG, destChapter, destName]
const PHOTOS = [
  ["IMG_0054", "ceremony", "the-kiss"],
  ["IMG_0001", "ceremony", "morning-01"],
  ["IMG_0009", "ceremony", "morning-02"],
  ["IMG_0013", "ceremony", "morning-03"],
  ["IMG_0063", "ceremony", "morning-04"],
  ["IMG_0044", "ceremony", "morning-05"],
  ["IMG_0002", "ceremony", "morning-06"],
  ["IMG_1679", "ceremony", "aisle-01"],
  ["IMG_0055", "ceremony", "couple-01"],
  ["IMG_0019", "ceremony", "couple-02"],
  ["IMG_0053", "ceremony", "couple-03"],
  ["IMG_9277", "ceremony", "couple-04"],
  ["IMG_0026", "ceremony", "detail-01"],
  ["IMG_0065", "ceremony", "detail-02"],
  ["IMG_0027", "ceremony", "detail-03"],
  ["IMG_0066", "ceremony", "detail-04"],
  ["IMG_0050", "ceremony", "detail-05"],
  ["IMG_1582", "cocktail", "gather-01"],
  ["IMG_1585", "cocktail", "gather-02"],
  ["IMG_1588", "cocktail", "gather-03"],
  ["IMG_1685", "cocktail", "gather-04"],
  ["IMG_1690", "cocktail", "gather-05"],
  ["IMG_9234", "cocktail", "gather-06"],
  ["IMG_9237", "cocktail", "gather-07"],
  ["IMG_0043", "cocktail", "gather-08"],
  ["IMG_0046", "cocktail", "gather-09"],
  ["IMG_0070", "cocktail", "gather-10"],
  ["IMG_0201", "cocktail", "gather-11"],
  ["IMG_4374", "cocktail", "gather-12"],
  ["IMG_0110", "reception", "recep-01"],
  ["IMG_0176", "reception", "recep-02"],
  ["IMG_0177", "reception", "recep-03"],
  ["IMG_0119", "reception", "recep-04"],
  ["IMG_0097", "afterparty", "party-01"],
  ["IMG_0098", "afterparty", "party-02"],
  ["IMG_0089", "afterparty", "party-03"],
  ["IMG_0090", "afterparty", "party-04"],
  ["IMG_0096", "afterparty", "party-05"],
  ["IMG_0049", "afterparty", "party-06"],
];

// clip map: [sourceIMG, destChapter, destName]
const VIDEOS = [
  ["IMG_7967", "reception", "reception-film"],
  ["IMG_7981", "afterparty", "party-film-1"],
  ["IMG_7985", "afterparty", "party-film-2"],
  ["IMG_7992", "afterparty", "party-film-3"],
];

async function main() {
  for (const ch of ["ceremony", "cocktail", "reception", "afterparty"]) {
    await mkdir(path.join(DEST, ch), { recursive: true });
  }

  let p = 0;
  for (const [src, ch, name] of PHOTOS) {
    const from = path.join(ORIG, `${src}.jpg`);
    const to = path.join(DEST, ch, `${name}.jpg`);
    await sharp(from)
      .rotate()
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(to);
    p++;
  }
  console.log(`✓ ${p} photos optimized`);

  let v = 0;
  for (const [src, ch, name] of VIDEOS) {
    const from = path.join(CLIPS, `${src}.MP4`);
    const mp4 = path.join(DEST, ch, `${name}.mp4`);
    const poster = path.join(DEST, ch, `${name}.jpg`);
    // compressed mp4
    await exec("ffmpeg", [
      "-y", "-i", from,
      "-vf", "scale='min(1280,iw)':-2",
      "-c:v", "libx264", "-crf", "24", "-preset", "slow",
      "-an", "-movflags", "+faststart",
      mp4,
    ]);
    // poster at ~20%
    const dur = await videoDuration(from);
    const t = (dur * 0.2).toFixed(2);
    await exec("ffmpeg", ["-y", "-ss", t, "-i", from, "-frames:v", "1", "-q:v", "3", poster]);
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
