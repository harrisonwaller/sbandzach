/**
 * Media build — scans /public/media, classifies every file, generates blur
 * placeholders and dimensions, merges optional meta.json, and writes
 * content/generated-media.json.
 *
 *   npm run media:build
 *
 * Idempotent and safe on empty folders. content/generated-media.json is fully
 * regenerated each run, so never edit it by hand.
 *
 * META
 *   Drop a meta.json into any media folder to annotate its files. Shape:
 *     {
 *       "_defaults": { "visibility": "public" },        // applied to all files
 *       "engagement-01.jpg": { "featured": true, "caption": "spring · mmxxvi" },
 *       "placeholder-toast.wav": { "speaker": "Cade", "speakerRole": "Best Man",
 *                                  "pullQuote": "…", "transcript": "…" }
 *     }
 *   A poster frame for a video can be supplied by placing <video-name>.jpg
 *   beside it (used as the thumbnail).
 */
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";
import sharp from "sharp";
import { getPlaiceholder } from "plaiceholder";

const ROOT = process.cwd();
const MEDIA_DIR = path.join(ROOT, "public", "media");
const OUT = path.join(ROOT, "content", "generated-media.json");

type MediaType = "photo" | "video" | "audio" | "letter" | "quote";
type Chapter =
  | "engagement" | "friday" | "ceremony" | "cocktail" | "reception"
  | "afterparty" | "toasts" | "dances" | "letters" | "vault";
type Visibility = "public" | "hidden" | "vault";

type MediaItem = {
  id: string;
  type: MediaType;
  src: string;
  thumbnail?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  title?: string;
  caption?: string;
  speaker?: string;
  speakerRole?: string;
  speakerPhoto?: string;
  chapter: Chapter;
  date?: string;
  featured?: boolean;
  visibility: Visibility;
  pullQuote?: string;
  transcript?: string;
  sortOrder?: number;
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const AUDIO_EXT = new Set([".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"]);

/** Map a media-relative directory to its chapter. `speakers/` is excluded. */
function chapterFor(relDir: string): Chapter | null {
  const d = relDir.replace(/\\/g, "/");
  if (d === "engagement") return "engagement";
  if (d === "wedding/friday") return "friday";
  if (d === "wedding/ceremony") return "ceremony";
  if (d === "wedding/cocktail") return "cocktail";
  if (d === "wedding/reception") return "reception";
  if (d === "wedding/afterparty") return "afterparty";
  if (d === "toasts") return "toasts";
  if (d === "dances") return "dances";
  if (d === "letters") return "letters";
  if (d === "vault") return "vault";
  return null; // speakers/, wedding/ root, etc.
}

function typeFor(ext: string, chapter: Chapter): MediaType {
  if (VIDEO_EXT.has(ext)) return "video";
  if (AUDIO_EXT.has(ext)) return "audio";
  if (IMAGE_EXT.has(ext)) return chapter === "letters" ? "letter" : "photo";
  return "photo";
}

async function loadMeta(dirAbs: string): Promise<Record<string, any>> {
  try {
    const raw = await readFile(path.join(dirAbs, "meta.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function fileExists(p: string): Promise<boolean> {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

async function main() {
  // Ensure the media dir exists; if not, write an empty manifest and exit clean.
  try {
    await readdir(MEDIA_DIR);
  } catch {
    await writeFile(OUT, "[]\n");
    console.log("No /public/media directory — wrote empty manifest.");
    return;
  }

  const entries = await glob("**/*", {
    cwd: MEDIA_DIR,
    nodir: true,
    dot: false,
  });

  const items: MediaItem[] = [];
  const counts = { photo: 0, video: 0, audio: 0, letter: 0, quote: 0 } as Record<MediaType, number>;
  const metaCache = new Map<string, Record<string, any>>();

  for (const rel of entries.sort()) {
    const base = path.basename(rel);
    const ext = path.extname(rel).toLowerCase();
    if (base === "meta.json" || base === ".gitkeep") continue;
    if (!IMAGE_EXT.has(ext) && !VIDEO_EXT.has(ext) && !AUDIO_EXT.has(ext)) continue;

    const relDir = path.dirname(rel);
    const chapter = chapterFor(relDir);
    if (!chapter) continue; // skip speakers/ and unmapped dirs

    // Skip video poster frames (consumed as thumbnails, not standalone items).
    const stem = base.slice(0, base.length - ext.length);
    if (IMAGE_EXT.has(ext)) {
      const siblingVideo = [...VIDEO_EXT].some((ve) =>
        entries.includes(path.join(relDir, stem + ve)),
      );
      if (siblingVideo) continue;
    }

    const absDir = path.join(MEDIA_DIR, relDir);
    if (!metaCache.has(relDir)) metaCache.set(relDir, await loadMeta(absDir));
    const meta = metaCache.get(relDir)!;
    const fileMeta = { ...(meta._defaults ?? {}), ...(meta[base] ?? {}) };

    const type: MediaType = fileMeta.type ?? typeFor(ext, chapter);
    const src = "/" + path.posix.join("media", rel.split(path.sep).join("/"));
    const item: MediaItem = {
      id: fileMeta.id ?? `${chapter}-${stem}`.toLowerCase(),
      type,
      src,
      chapter: fileMeta.chapter ?? chapter,
      visibility: fileMeta.visibility ?? (chapter === "vault" ? "vault" : "public"),
    };

    // Dimensions + blur placeholder for images.
    if (IMAGE_EXT.has(ext)) {
      try {
        const buf = await readFile(path.join(MEDIA_DIR, rel));
        const m = await sharp(buf).metadata();
        if (m.width && m.height) {
          item.width = m.width;
          item.height = m.height;
        }
        const { base64 } = await getPlaiceholder(buf, { size: 16 });
        item.blurDataURL = base64;
      } catch (e) {
        console.warn(`  ! could not process image ${rel}: ${(e as Error).message}`);
      }
    }

    // Video poster frame, if a sibling image was dropped next to it.
    if (VIDEO_EXT.has(ext)) {
      for (const ie of IMAGE_EXT) {
        const poster = path.join(relDir, stem + ie);
        if (await fileExists(path.join(MEDIA_DIR, poster))) {
          item.thumbnail = "/" + path.posix.join("media", poster.split(path.sep).join("/"));
          try {
            const posterBuf = await readFile(path.join(MEDIA_DIR, poster));
            // The poster is extracted at the video's native resolution, so its
            // dimensions are the video's — use them for the player's aspect box.
            const pm = await sharp(posterBuf).metadata();
            if (pm.width && pm.height) {
              item.width = pm.width;
              item.height = pm.height;
            }
            const { base64 } = await getPlaiceholder(posterBuf, { size: 16 });
            item.blurDataURL = base64;
          } catch {}
          break;
        }
      }
      if (!item.thumbnail) {
        console.warn(`  ! video ${rel} has no poster frame (drop ${stem}.jpg beside it)`);
      }
    }

    // Carry through the optional editorial fields.
    for (const k of [
      "title", "caption", "speaker", "speakerRole", "speakerPhoto",
      "date", "featured", "pullQuote", "transcript", "sortOrder", "thumbnail",
      "focusY",
    ] as const) {
      if (fileMeta[k] !== undefined) (item as any)[k] = fileMeta[k];
    }

    items.push(item);
    counts[type]++;
  }

  // Deterministic order so re-runs produce identical output.
  items.sort((a, b) => a.id.localeCompare(b.id));

  await writeFile(OUT, JSON.stringify(items, null, 2) + "\n");

  console.log(
    `Found ${counts.photo} photos, ${counts.video} videos, ${counts.audio} audio, ${counts.letter} letters.`,
  );
  console.log(`✓ Wrote ${items.length} item(s) to content/generated-media.json`);
}

main().catch((err) => {
  console.error("✗ media:build failed:", err);
  process.exit(1);
});
