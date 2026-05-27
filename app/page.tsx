import {
  engagementPhotos,
  featuredImage,
  voiceTracks,
  archivePhotos,
  vaultMedia,
} from "@/content/media";
import { lettersArePlaceholder } from "@/content/letters";

import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { FeaturedImage } from "@/components/FeaturedImage";
import { Gallery } from "@/components/Gallery";
import { Schedule } from "@/components/Schedule";
import { Venue } from "@/components/Venue";
import { Voices } from "@/components/Voices";
import { Letters } from "@/components/Letters";
import { Archive } from "@/components/Archive";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { Vault } from "@/components/Vault";
import { Footer } from "@/components/Footer";

export default function Page() {
  const featured = featuredImage();
  // The featured frame leads the page; keep it out of the grid below it.
  const gallery = engagementPhotos().filter((p) => p.id !== featured?.id);
  const tracks = voiceTracks();
  const archive = archivePhotos();
  const vault = vaultMedia();

  // Each future chapter shows an elegant preview until its real content exists,
  // then the real section takes its place automatically.
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <FeaturedImage />
        <Gallery photos={gallery} />
        <Schedule />
        <Venue />

        {tracks.length > 0 ? (
          <Voices tracks={tracks} />
        ) : (
          <SectionPlaceholder
            id="voices"
            mark="Chapter IV"
            title="The"
            titleEm="Voices"
            description="The toasts, the blessings, and the first dances — each recorded, with the words that were said."
            variant="waveform"
            tone="dark"
          />
        )}

        {!lettersArePlaceholder ? (
          <Letters />
        ) : (
          <SectionPlaceholder
            id="letters"
            mark="Chapter V"
            title="In their"
            titleEm="words"
            description="Short notes from the family and friends who were there."
            variant="quote"
            tone="cream"
          />
        )}

        {archive.length > 0 ? (
          <Archive photos={archive} />
        ) : (
          <SectionPlaceholder
            id="archive"
            mark="Chapter VI"
            title="The"
            titleEm="archive"
            description="Every photograph from the weekend — Friday, the ceremony, the reception, the long night after — gathered in one place."
            variant="frames"
            tone="creamDeep"
          />
        )}

        <Vault media={vault} />
      </main>
      <Footer />
    </>
  );
}
