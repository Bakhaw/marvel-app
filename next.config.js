const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  images: {
    domains: [
      "i.annihil.us", // marvel api
      "ik.imagekit.io", // harry-potter api
      "static.wikia.nocookie.net", // naruto api
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/marvel",
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
