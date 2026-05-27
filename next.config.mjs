/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Locally the build output stays inside the project but the `.nosync` suffix
  // keeps it out of iCloud Drive sync. On Vercel/CI we use the standard `.next`.
  distDir: process.env.VERCEL || process.env.CI ? ".next" : ".next.nosync",
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
