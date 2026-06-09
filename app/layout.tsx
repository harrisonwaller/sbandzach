import type { Metadata, Viewport } from "next";
import { Italiana, Cormorant_Garamond } from "next/font/google";
import { site } from "@/content/site";
import { VaultProvider } from "@/components/VaultProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const display = Italiana({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const serif = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: `${site.names.first} & ${site.names.second} — ${site.dateLong}`,
  description: `${site.names.first} and ${site.names.second}. ${site.location}. A keepsake of the days along the way.`,
  openGraph: {
    title: `${site.names.first} & ${site.names.second}`,
    description: `${site.dateLong} · ${site.location}`,
    type: "website",
    url: `https://${site.domain}`,
    siteName: `${site.names.first} & ${site.names.second}`,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.names.first} & ${site.names.second} — ${site.location}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.names.first} & ${site.names.second}`,
    description: `${site.dateLong} · ${site.location}`,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`}>
      <body>
        {/* Resilience: if JS never runs (old browser years from now, CDN hiccup),
            the scroll-reveal's inline opacity:0 would hide the whole album — keep
            every section readable without JS. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Server-rendered loader — part of the first paint, fades via CSS. */}
        <div className="loader" aria-hidden>
          <div className="loader-mark">{site.mark}</div>
        </div>
        <ScrollProgress />
        <VaultProvider>{children}</VaultProvider>
      </body>
    </html>
  );
}
