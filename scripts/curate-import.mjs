/**
 * Import the curated wedding media into public/media/wedding/*.
 * Sources: full-res originals (~/dev/sbz-curate/orig), the owner's hand-picked
 * keepers (~/.claude/image-cache/...), and clips (~/dev/sbz-curate/clips).
 * Photos → max 2000px q82. Clips → H.264 CRF24 + poster. Re-runnable.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, rm, readdir } from "node:fs/promises";
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
  // Getting ready (candid — kept; the strongest of the day's quiet moments)
  [path.join(ORIG, "IMG_0014.jpg"), "ceremony", "ready-01"], // bride on lakehouse steps
  [path.join(PICK, "6.png"), "ceremony", "ready-02"],        // bathroom helping bride (funny)
  [path.join(PICK, "8.png"), "ceremony", "ready-03"],        // mirror selfie
  [path.join(ORIG, "IMG_0006.jpg"), "ceremony", "ready-04"], // bridesmaids laughing/toasting
  // The ceremony — the REAL thing: officiant, guests on the lawn, the vows.
  [path.join(ORIG, "IMG_1682.jpg"), "ceremony", "cer-01"],   // down the aisle with her dad (guests)
  [path.join(ORIG, "IMG_1685.jpg"), "ceremony", "cer-02"],   // the vows — officiant + groomsmen
  [path.join(ORIG, "IMG_1688.jpg"), "ceremony", "cer-03"],   // the lace dress back, guests behind
  [path.join(ORIG, "IMG_1683.jpg"), "ceremony", "cer-04"],   // arriving at the altar (guests seated)
  [path.join(ORIG, "IMG_0054.jpg"), "ceremony", "the-kiss"], // hero (the kiss on the green)
  // On the green — purified to genuine lake/lawn frames + the cake.
  [path.join(ORIG, "IMG_1585.jpg"), "cocktail", "green-01"], // full wedding party under the pine
  [path.join(ORIG, "IMG_1588.jpg"), "cocktail", "green-02"], // bridesmaids line, lake panorama
  [path.join(ORIG, "IMG_0070.jpg"), "cocktail", "green-03"], // bridesmaids in blue, lakeside
  [path.join(ORIG, "IMG_1692.jpg"), "cocktail", "green-04"], // guests laughing selfie on the green
  [path.join(ORIG, "IMG_0045.jpg"), "cocktail", "green-05"], // bridesmaids leaning, playful, lake
  [path.join(ORIG, "IMG_0201.jpg"), "cocktail", "cake"],     // the cake by the lake
  // Reception (warm / purple — couple + family on the floor)
  [path.join(PICK, "2.jpeg"), "reception", "dance-01"],       // bride + groom + parents dancing (keeper)
  [path.join(ORIG, "IMG_0104.jpg"), "reception", "dance-02"], // dancing with the moms
  [path.join(ORIG, "IMG_0105.jpg"), "reception", "dance-03"], // moms clapping, laughing
  [path.join(ORIG, "IMG_0118.jpg"), "reception", "dance-04"], // the floor, drummer behind
  [path.join(ORIG, "IMG_0120.jpg"), "reception", "dance-05"], // bride laughing mid-dance
  [path.join(ORIG, "IMG_0106.jpg"), "reception", "dance-06"], // couple + family laughing
  [path.join(PICK, "9.png"), "reception", "dance-07"],        // bride + groom dancing (keeper)
  // After party (teal, crescendo — the peak of the night)
  [path.join(ORIG, "IMG_0110.jpg"), "afterparty", "party-01"], // bride centered, friends dancing
  [path.join(ORIG, "IMG_0099.jpg"), "afterparty", "party-02"], // arms raised, celebrating
  [path.join(ORIG, "IMG_0117.jpg"), "afterparty", "party-03"], // arms up around the bride
  [path.join(ORIG, "IMG_0093.jpg"), "afterparty", "party-04"], // bride embraced by friends
  [path.join(ORIG, "IMG_0098.jpg"), "afterparty", "party-05"], // bride laughing with friends
  [path.join(ORIG, "IMG_0090.jpg"), "afterparty", "party-06"], // cheering with the band
  [path.join(ORIG, "IMG_0102.jpg"), "afterparty", "party-07"], // bride hug, laughing
  [path.join(ORIG, "IMG_0115.jpg"), "afterparty", "party-08"], // bridesmaids arms-up cheer
];

// [sourceClip, destChapterFolder, destName]
const VIDEOS = [
  [path.join(CLIPS, "IMG_7967.MP4"), "reception", "reception-film"], // purple, couple/family (funny)
  [path.join(CLIPS, "IMG_7981.MP4"), "afterparty", "party-film-2"],  // teal, the girls in a line
  [path.join(CLIPS, "IMG_7992.MP4"), "afterparty", "party-film"],    // teal peak (last song)
];

async function main() {
  // Clean prior import so nothing stale lingers — but preserve hand-authored
  // meta.json (captions, focus crops, ids), which is not regenerated here.
  for (const ch of ["ceremony", "cocktail", "reception", "afterparty"]) {
    const dir = path.join(DEST, ch);
    await mkdir(dir, { recursive: true });
    for (const f of await readdir(dir)) {
      if (f === "meta.json") continue;
      await rm(path.join(dir, f), { recursive: true, force: true });
    }
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
