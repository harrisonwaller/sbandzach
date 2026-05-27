/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build output stays inside the project (so module resolution works) but the
  // `.nosync` suffix keeps it out of iCloud Drive sync. Vercel reads distDir
  // from here, so deploys are unaffected.
  distDir: ".next.nosync",
  // Keep the dev overlay out of audit screenshots.
  devIndicators: { buildActivity: false, appIsrStatus: false },
  images: {
    // Engagement photos are downloaded locally via `npm run media:fetch-zola`,
    // but allow Zola as a remote fallback for the build-time featured image.
    remotePatterns: [
      { protocol: "https", hostname: "images.zola.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
