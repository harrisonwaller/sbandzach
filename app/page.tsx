import { vaultMedia } from "@/content/media";
import { capsule } from "@/content/capsule";

import { TopBar } from "@/components/TopBar";
import { CapsuleHero } from "@/components/CapsuleHero";
import { CapsuleChapter } from "@/components/CapsuleChapter";
import { Vault } from "@/components/Vault";
import { Finale } from "@/components/Finale";
import { Footer } from "@/components/Footer";

/**
 * The Memory Capsule. A single scroll that opens as a quiet ivory album (the
 * morning, the vows, the details), warms through golden hour, then dims into a
 * dark cinematic film for the reception and the party — the four clips building
 * to the last song. The Vault easter egg stays hidden until the passphrase.
 */
export default function Page() {
  const vault = vaultMedia();

  return (
    <>
      <TopBar />
      <main>
        <CapsuleHero />
        {capsule.map((section) => (
          <CapsuleChapter key={section.id} section={section} />
        ))}
        <Vault media={vault} />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
