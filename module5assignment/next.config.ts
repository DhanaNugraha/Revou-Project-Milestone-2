import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com',
      },
    ],
  },
}

export default nextConfig;
