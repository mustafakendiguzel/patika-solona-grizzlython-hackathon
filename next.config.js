/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**/**",
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/public/upload-image.jpg')",
        "footer-texture": "url('/public/upload-image.jpg')",
      },
    },
  },
};
module.exports = withPlugins([withImages], nextConfig);
