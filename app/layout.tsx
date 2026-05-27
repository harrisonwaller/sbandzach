import type { Metadata, Viewport } from "next";
import { Italiana, Cormorant_Garamond } from "next/font/google";
import { site } from "@/content/site";
import { VaultProvider } from "@/components/VaultProvider";
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
        <VaultProvider>{children}</VaultProvider>
      </body>
    </html>
  );
}
