import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sheep.thingkingland.app",
        pathname: "/free-food/**",
      },
    ],
  },
};

export default nextConfig;
