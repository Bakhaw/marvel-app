const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
  dest: "public",
  register: true,
  runtimeCaching,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
  images: {
    domains: ["i.annihil.us"], // images coming from marvel api
  },
});

module.exports = nextConfig;
