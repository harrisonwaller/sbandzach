"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useVault } from "@/components/VaultProvider";
import { vault } from "@/content/vault";
import { vaultMedia, type MediaItem } from "@/content/media";
import { Lightbox } from "@/components/Lightbox";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The hidden chapter. Appears only after the 060626 passphrase is typed
 * (handled by VaultProvider). Not linked anywhere — a pure discovery moment.
 */
export function Vault({ media }: { media: MediaItem[] }) {
  const { unlocked, justUnlocked } = useVault();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (justUnlocked && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [justUnlocked]);

  return (
    <>
      {/* brief cue the moment it opens */}
      <AnimatePresence>
        {justUnlocked && (
          <motion.div
            className="fixed left-1/2 top-8 z-[400] -translate-x-1/2 font-display text-[0.7rem] uppercase text-gold-soft"
            style={{ letterSpacing: "0.4em", textIndent: "0.4em" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            the vault is open
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unlocked && (
          <motion.section
            id="vault"
            ref={ref as React.RefObject<HTMLElement>}
            className="overflow-hidden text-cream"
            style={{ background: "#0c0a08" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="mx-auto max-w-chapter px-6 py-[var(--section-y)] text-center sm:px-10">
              <motion.p
                className="font-serif font-light italic text-cream"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.4rem)",
                  transform: "rotate(-1.5deg)",
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease }}
              >
                {vault.intro}
              </motion.p>
              <p className="mx-auto mt-8 max-w-prose font-serif text-[1.1rem] italic leading-relaxed text-cream/45">
                {vault.subtext}
              </p>

              {media.length === 0 ? (
                <p
                  className="mt-16 font-display text-[0.72rem] uppercase text-cream/30"
                  style={{ letterSpacing: "0.4em", textIndent: "0.4em" }}
                >
                  {vault.emptyNote}
                </p>
              ) : (
                <div className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                  {media.map((m, i) => (
                    <button
                      key={m.id}
                      className="gallery-cell aspect-[4/5]"
                      onClick={() => setIndex(i)}
                      aria-label="View private frame"
                    >
                      <Image
                        src={m.thumbnail ?? m.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, 30vw"
                        placeholder={m.blurDataURL ? "blur" : "empty"}
                        blurDataURL={m.blurDataURL}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Lightbox
              items={media}
              index={index}
              onClose={() => setIndex(null)}
              onIndexChange={setIndex}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
