import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
       {
        protocol: 'https',
        hostname: 'example.com',
      },
       {
        protocol: 'https',
        hostname: 'tgsjdgupfubzpnkwmqmi.supabase.co',
      },
       {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },
};

export default nextConfig;
