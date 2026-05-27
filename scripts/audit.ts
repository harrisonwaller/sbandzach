/**
 * Visual audit harness. Screenshots the key views at desktop (1440×900) and
 * iPhone-14 (390×844) and writes them to /audit/iter-{N}/.
 *
 *   ITER=3 npm run audit:screenshot
 *   npm run audit:screenshot 3
 *
 * Runs with reduced-motion emulated so entrance/scroll animations settle
 * instantly and screenshots are stable and comparable across iterations.
 */
import { chromium, type Page } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.AUDIT_URL ?? "http://localhost:3100";
const ITER = Number(process.env.ITER ?? process.argv[2] ?? "1");

type View = {
  name: string;
  selector?: string; // section to align to the top of the viewport
  mode?: "top" | "mid" | "bottom";
  play?: boolean; // click the Voices play button to expand the track
};

const VIEWS: View[] = [
  { name: "hero", mode: "top" },
  { name: "featured", selector: "#featured" },
  { name: "gallery", selector: "#frames", mode: "mid" },
  { name: "schedule", selector: "#weekend" },
  { name: "voices", selector: "#voices", play: true },
  { name: "letters", selector: "#letters" },
  { name: "forthcoming", selector: "#forthcoming" },
  { name: "footer", selector: "footer", mode: "bottom" },
];

const VIEWPORTS = [
  { tag: "desktop", width: 1440, height: 900, isMobile: false },
  { tag: "mobile", width: 390, height: 844, isMobile: true },
];

async function waitForImages(page: Page) {
  // Wait only for images already in/near the viewport, and cap each wait so
  // lazy below-fold images (whose load event never fires until scrolled to)
  // can never hang the run.
  await page
    .evaluate(async () => {
      const near = Array.from(document.images).filter((img) => {
        if (img.complete) return false;
        const r = img.getBoundingClientRect();
        return r.bottom > -200 && r.top < window.innerHeight + 600;
      });
      await Promise.all(
        near.map(
          (img) =>
            new Promise<void>((res) => {
              const done = () => res();
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
              setTimeout(done, 2500);
            }),
        ),
      );
    })
    .catch(() => {});
}

async function positionFor(page: Page, view: View, vh: number) {
  if (view.mode === "bottom") {
    await page.evaluate((sel) => {
      const el = sel ? document.querySelector(sel) : null;
      if (el) el.scrollIntoView({ block: "end" });
      else window.scrollTo(0, document.body.scrollHeight);
      // settle at the true bottom
      window.scrollTo(0, document.body.scrollHeight);
    }, view.selector ?? null);
    return;
  }
  if (!view.selector) {
    await page.evaluate(() => window.scrollTo(0, 0));
    return;
  }
  await page.evaluate(
    ({ sel, mode, vh }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const y = mode === "mid" ? top + r.height / 2 - vh / 2 : top;
      window.scrollTo(0, Math.max(0, y));
    },
    { sel: view.selector, mode: view.mode ?? "top", vh },
  );
}

async function run() {
  const outDir = path.join(process.cwd(), "audit", `iter-${ITER}`);
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  console.log(`\n▲ Audit — iteration ${ITER}  →  ${outDir}\n`);

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(800);
    await waitForImages(page);

    for (const view of VIEWS) {
      await positionFor(page, view, vp.height);
      await page.waitForTimeout(500);
      await waitForImages(page);

      if (view.play) {
        const btn = page.locator('#voices button[aria-label="Play"]').first();
        if (await btn.count()) {
          await btn.click().catch(() => {});
          await page.waitForTimeout(1600); // let waveform + transcript settle
        }
      }

      await page.waitForTimeout(300);
      const file = path.join(outDir, `${view.name}-${vp.tag}.png`);
      await page.screenshot({ path: file });
      console.log(`  ✓ ${view.name}-${vp.tag}`);
    }

    await context.close();
  }

  await browser.close();
  console.log(`\n✓ Iteration ${ITER} screenshots saved.\n`);
}

run().catch((err) => {
  console.error("✗ audit failed:", err);
  process.exit(1);
});
