"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

const SESSION_KEY = "sz:loaded";

/**
 * The opening "S · Z" mark. Shows once per session, then fades to the hero.
 * On return visits within the session it doesn't show at all.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduce) {
      setShow(false);
      return;
    }
    setShow(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — fine, it just shows again next load */
    }
    const t = setTimeout(() => setShow(false), 2100);
    return () => clearTimeout(t);
  }, [reduce]);

  // Avoid a hydration flash: render nothing until we know the session state.
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <motion.div
            className="font-display text-ink"
            style={{ letterSpacing: "0.5em", textIndent: "0.5em" }}
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="text-[clamp(2.5rem,8vw,4.5rem)]">{site.mark}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
