"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/**
 * Slides away on scroll down, returns on scroll up. Cream-to-transparent wash
 * with a soft blur so it never competes with the content beneath it.
 */
export function TopBar() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScroll.current;
      setHidden(goingDown && y > 120);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 sm:px-10 sm:py-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(245,240,230,0.92) 0%, rgba(245,240,230,0) 100%)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.55s var(--ease-editorial)",
      }}
    >
      <a
        href="#top"
        aria-label="Back to top"
        className="-my-3 inline-flex min-h-[44px] items-center py-3 font-serif text-[1.15rem] font-semibold uppercase text-ink"
        style={{ letterSpacing: "0.22em" }}
      >
        {site.markFull}
      </a>
      <span
        className="hidden font-serif text-[0.95rem] font-semibold uppercase text-ink/80 sm:block"
        style={{ letterSpacing: "0.16em" }}
      >
        {site.dateNumeric}
      </span>
    </header>
  );
}
