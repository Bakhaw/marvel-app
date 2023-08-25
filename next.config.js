const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["i.annihil.us", "ik.imagekit.io"], // images coming from different apis
  },
});

module.exports = nextConfig;
