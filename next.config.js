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
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};
module.exports = withPlugins([withImages], nextConfig);
