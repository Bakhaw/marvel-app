const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.annihil.us"], // images coming from marvel api
  },
};

module.exports = withPWA(nextConfig);
