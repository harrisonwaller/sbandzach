import {
  engagementPhotos,
  featuredImage,
  voiceTracks,
  archivePhotos,
  vaultMedia,
} from "@/content/media";

import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { FeaturedImage } from "@/components/FeaturedImage";
import { Gallery } from "@/components/Gallery";
import { Schedule } from "@/components/Schedule";
import { Venue } from "@/components/Venue";
import { Voices } from "@/components/Voices";
import { Letters } from "@/components/Letters";
import { Archive } from "@/components/Archive";
import { Vault } from "@/components/Vault";
import { Footer } from "@/components/Footer";

export default function Page() {
  const featured = featuredImage();
  // The featured frame leads the page; keep it out of the grid below it.
  const gallery = engagementPhotos().filter((p) => p.id !== featured?.id);
  const tracks = voiceTracks();
  const archive = archivePhotos();
  const vault = vaultMedia();

  // Voices, Letters and Archive render only when they have real content — until
  // then they stay quietly absent (no "coming soon" announcements).
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <FeaturedImage />
        <Gallery photos={gallery} />
        <Schedule />
        <Venue />
        <Voices tracks={tracks} />
        <Letters />
        <Archive photos={archive} />
        <Vault media={vault} />
      </main>
      <Footer />
    </>
  );
}
