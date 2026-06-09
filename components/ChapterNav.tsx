"use client";

import { useEffect, useState } from "react";
import { capsule } from "@/content/capsule";

/**
 * A quiet wayfinding rail on the right edge — one hairline tick per chapter,
 * the active one drawn out in gold with its name. Lets family scrub through the
 * book and always know where they are. Real navigation, not decoration, so it
 * stays useful under reduced motion. Hidden on small screens to keep the album
 * uncluttered on a phone.
 */
export function ChapterNav() {
  const [active, setActive] = useState<string>(capsule[0]?.id ?? "");

  useEffect(() => {
    const ids = capsule.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    // The chapter whose top is nearest just-below the upper third wins.
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
    >
      {capsule.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => jump(s.id)}
            aria-label={`${s.title} ${s.titleEm}`}
            aria-current={on ? "true" : undefined}
            className="group flex items-center gap-2.5 outline-none"
          >
            <span
              className="font-serif text-[0.7rem] lowercase italic opacity-0 transition-all duration-500 group-hover:opacity-100"
              style={{
                letterSpacing: "0.14em",
                color: on ? "var(--gold)" : "rgba(150,132,96,0.85)",
                opacity: on ? 1 : undefined,
              }}
            >
              {s.titleEm}
            </span>
            <span
              aria-hidden
              className="block h-px transition-all duration-500"
              style={{
                width: on ? "26px" : "14px",
                background: on ? "var(--gold)" : "rgba(150,132,96,0.55)",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
