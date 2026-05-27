"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { VAULT_CODE } from "@/content/site";

type VaultState = {
  unlocked: boolean;
  /** Becomes true for a moment right after unlocking, to cue the reveal. */
  justUnlocked: boolean;
};

const VaultContext = createContext<VaultState>({
  unlocked: false,
  justUnlocked: false,
});

export function useVault() {
  return useContext(VaultContext);
}

/**
 * Listens for the wedding-date passphrase (060626) typed anywhere on the site
 * and reveals the hidden Vault chapter. Not linked anywhere — pure discovery.
 */
export function VaultProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (unlocked) return;
    let buffer = "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (e: KeyboardEvent) => {
      // Only listen to bare digit keys; ignore typing in inputs (there are none,
      // but stay defensive) and modified keys.
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!/^\d$/.test(e.key)) return;

      buffer = (buffer + e.key).slice(-VAULT_CODE.length);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => (buffer = ""), 2000);

      if (buffer === VAULT_CODE) {
        setUnlocked(true);
        setJustUnlocked(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer) clearTimeout(timer);
    };
  }, [unlocked]);

  // Let the "just unlocked" cue settle after the reveal scroll.
  useEffect(() => {
    if (!justUnlocked) return;
    const t = setTimeout(() => setJustUnlocked(false), 2600);
    return () => clearTimeout(t);
  }, [justUnlocked]);

  return (
    <VaultContext.Provider value={{ unlocked, justUnlocked }}>
      {children}
    </VaultContext.Provider>
  );
}
